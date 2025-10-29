/* Vanilla Table Enhancer (VTE)
 * Search + Sort + Pagination for any <table> (no deps, RequireJS-safe).
 * API: VTE.enhance(selectorOrElement, options?)
 * Multiple tables supported: pass a CSS selector matching many tables or an array.
 *
 * Column typing:
 * - Add data-vte="number" or data-vte="date" on <th> to type that column.
 * - Or pass options.numericCols / options.dateCols as arrays of 0-based indexes.
 */

(function (root) {
    'use strict';
  
    function toArray(x){
      if (!x) return [];
      if (Array.isArray(x)) return x;
      if (typeof x === 'string') return Array.from(document.querySelectorAll(x));
      if (x.nodeType === 1) return [x];
      return Array.from(x);
    }
  
    function create(tag, cls, text){
      var el = document.createElement(tag);
      if (cls) el.className = cls;
      if (text != null) el.textContent = text;
      return el;
    }
  
    function getCellText(tr, i){
      var cell = tr.cells[i];
      return cell ? (cell.textContent || '').trim() : '';
    }
  
    function indexColumns(thRow, opts){
      var ths = Array.from(thRow.cells);
      var numeric = new Set(opts.numericCols || []);
      var date = new Set(opts.dateCols || []);
  
      // Read per-TH hints
      ths.forEach(function(th, i){
        var t = (th.getAttribute('data-vte') || '').toLowerCase();
        if (t === 'number') numeric.add(i);
        else if (t === 'date') date.add(i);
      });
  
      return { numeric: numeric, date: date };
    }
  
    function parseValue(tr, i, typed){
      var raw = getCellText(tr, i);
      if (typed.numeric.has(i)) {
        // Handle fractions like "12/15" -> 12; else parse float
        var m = raw.match(/^(\d+)/);
        return m ? parseInt(m[1], 10) : parseFloat((raw||'').replace(/[^\d.-]/g,'')) || 0;
      }
      if (typed.date.has(i)) {
        var t = Date.parse(raw);
        return isNaN(t) ? 0 : t;
      }
      return (raw || '').toLowerCase();
    }
  
    function enhanceOne(table, options){
      options = options || {};
      var perPageOptions = options.perPageOptions || [10,25,50,100];
      var perPage = options.perPage || perPageOptions[0];
      var labels = Object.assign({
        search: 'Search',
        rows: 'Rows',
        info: (start, end, total) => `Showing ${start}–${end} of ${total} entries`,
        noData: 'No data'
      }, options.labels || {});
  
      var thead = table.tHead;
      var tbody = table.tBodies && table.tBodies[0];
      if (!thead || !tbody) return;
  
      var headerRow = thead.rows[0];
      var typed = indexColumns(headerRow, options);
  
      // Controls bar
      var bar = create('div', 'vte-bar');
      var left = create('div', 'vte-left');
      var right = create('div', 'vte-right');
  
      var searchLabel = create('span', 'vte-info', labels.search);
      var searchInput = create('input', 'vte-input');
      searchInput.type = 'search';
      searchInput.placeholder = 'Search…';
  
      left.appendChild(searchLabel);
      left.appendChild(searchInput);
  
      var rowsLabel = create('span', 'vte-info', labels.rows);
      var perSelect = create('select', 'vte-select');
      perPageOptions.forEach(function(n){
        var o = create('option', null, String(n)); o.value = n; if (+n === +perPage) o.selected = true;
        perSelect.appendChild(o);
      });
  
      var info = create('span', 'vte-info', '');
      var pager = create('div', 'vte-pager');
  
      right.appendChild(rowsLabel);
      right.appendChild(perSelect);
      right.appendChild(info);
      right.appendChild(pager);
  
      table.parentNode.insertBefore(bar, table);
      bar.appendChild(left);
      bar.appendChild(right);
  
      // Data
      var allRows = Array.from(tbody.rows).map(function(tr, idx){
        return { el: tr, text: (tr.textContent || '').toLowerCase().replace(/\s+/g,' ').trim(), idx: idx };
      });
  
      var filtered = allRows.slice();
      var sortIndex = -1;
      var sortDir = 'asc';
      var page = 1;
  
      // Sorting UI
      Array.from(headerRow.cells).forEach(function(th, i){
        th.setAttribute('data-vte-sort', '');
        th.addEventListener('click', function(){
          if (sortIndex === i) { sortDir = (sortDir === 'asc' ? 'desc' : 'asc'); }
          else { sortIndex = i; sortDir = 'asc'; }
          Array.from(headerRow.cells).forEach(function(h){ h.removeAttribute('data-dir'); });
          th.setAttribute('data-dir', sortDir);
          apply();
        });
      });
  
      // Filter
      searchInput.addEventListener('input', function(){ page = 1; apply(); });
  
      // Per page
      perSelect.addEventListener('change', function(){
        perPage = +perSelect.value || perPageOptions[0];
        page = 1;
        apply();
      });
  
      function renderPager(total){
        pager.innerHTML = '';
        var pages = Math.max(1, Math.ceil(total / perPage));
        if (!total) { info.textContent = labels.noData; return; }
  
        function btn(label, p, disabled, active){
          var b = create('button', 'vte-page', label);
          if (disabled) b.setAttribute('disabled','');
          if (active) b.classList.add('active');
          b.addEventListener('click', function(){ if (!disabled) { page = p; render(); } });
          pager.appendChild(b);
        }
  
        btn('‹', Math.max(1, page-1), page===1, false);
  
        var windowSize = 5;
        var start = Math.max(1, page - Math.floor(windowSize/2));
        var end = Math.min(pages, start + windowSize - 1);
        start = Math.max(1, Math.min(start, end - windowSize + 1));
  
        if (start > 1) {
          btn('1', 1, false, page===1);
          if (start > 2) pager.appendChild(create('span', null, '…'));
        }
        for (var p=start; p<=end; p++) btn(String(p), p, false, p===page);
        if (end < pages) {
          if (end < pages-1) pager.appendChild(create('span', null, '…'));
          btn(String(pages), pages, false, page===pages);
        }
  
        btn('›', Math.min(pages, page+1), page===pages, false);
  
        var startRow = perPage*(page-1)+1;
        var endRow = Math.min(total, perPage*page);
        info.textContent = labels.info(startRow, endRow, total);
      }
  
      function apply(){
        var q = (searchInput.value || '').toLowerCase().trim();
        filtered = q ? allRows.filter(function(r){ return r.text.includes(q); }) : allRows.slice();
  
        if (sortIndex >= 0){
          filtered.sort(function(a,b){
            var va = parseValue(a.el, sortIndex, typed);
            var vb = parseValue(b.el, sortIndex, typed);
            var cmp = (va > vb) - (va < vb);
            return sortDir === 'asc' ? cmp : -cmp;
          });
        }
  
        page = Math.max(1, Math.min(page, Math.ceil(filtered.length / perPage) || 1));
        render();
      }
  
      function render(){
        // Hide all, then show the page slice
        allRows.forEach(function(r){ r.el.style.display = 'none'; });
  
        var total = filtered.length;
        var start = (page-1) * perPage;
        var end = Math.min(total, start + perPage);
  
        for (var i=start; i<end; i++){
          filtered[i].el.style.display = '';
        }
        renderPager(total);
      }
  
      apply();
      // return a small API if needed
      return {
        refresh: apply,
        destroy: function(){
          // remove controls and restore all rows visible
          if (bar && bar.parentNode) bar.parentNode.removeChild(bar);
          allRows.forEach(function(r){ r.el.style.display=''; });
          Array.from(headerRow.cells).forEach(function(th){ th.removeAttribute('data-vte-sort'); th.removeAttribute('data-dir'); });
        }
      };
    }
  
    var VTE = {
      enhance: function(selectorOrElements, options){
        var tables = toArray(selectorOrElements);
        return tables.map(function(t){ return enhanceOne(t, options || {}); });
      }
    };
  
    // Expose globally (no AMD/UMD to avoid RequireJS conflicts)
    root.VTE = VTE;
  
  })(window);

