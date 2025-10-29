# Vanilla Table Enhancer

A lightweight, dependency-free vanilla JavaScript library that adds **search**, **sort**, and **pagination** functionality to any HTML table. Zero dependencies, RequireJS-safe, and easy to integrate.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![No Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)

## ✨ Features

- 🔍 **Search/Filter** - Real-time table filtering
- 📊 **Sorting** - Click column headers to sort (ascending/descending)
- 📄 **Pagination** - Configurable rows per page
- 🔢 **Smart Typing** - Automatic number and date column detection
- 📱 **Responsive** - Mobile-friendly design
- 🚀 **Zero Dependencies** - Pure vanilla JavaScript
- 🎨 **Customizable** - Extensive styling and labeling options
- ♿ **Accessible** - Keyboard and screen reader friendly

## 📦 Installation

### npm

```bash
npm install vanilla-table-enhancer
```

### CDN

```html
<link rel="stylesheet" href="https://unpkg.com/vanilla-table-enhancer@latest/dist/vanilla-table-enhancer.css">
<script src="https://unpkg.com/vanilla-table-enhancer@latest/dist/vanilla-table-enhancer.js"></script>
```

### Manual Download

Download the files from the [releases page](https://github.com/bsekhosana/vanilla-table-enhancer/releases) or clone the repository:

```bash
git clone https://github.com/bsekhosana/vanilla-table-enhancer.git
```

Then include the files in your HTML:

```html
<link rel="stylesheet" href="dist/vanilla-table-enhancer.css">
<script src="dist/vanilla-table-enhancer.js"></script>
```

## 🚀 Quick Start

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="dist/vanilla-table-enhancer.css">
</head>
<body>
  <table id="myTable">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Age</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Doe</td>
        <td>john@example.com</td>
        <td>30</td>
      </tr>
      <!-- more rows -->
    </tbody>
  </table>

  <script src="dist/vanilla-table-enhancer.js"></script>
  <script>
    VTE.enhance('#myTable');
  </script>
</body>
</html>
```

That's it! Your table now has search, sort, and pagination.

## 📚 API Reference

### `VTE.enhance(selectorOrElement, options?)`

Enhances one or more tables with search, sort, and pagination functionality.

#### Parameters

- **`selectorOrElement`** (string | Element | Array) - CSS selector, DOM element, or array of elements
- **`options`** (object, optional) - Configuration object

#### Returns

An array of controller objects with the following methods:
- `refresh()` - Manually refresh the table (useful after data changes)
- `destroy()` - Remove the enhancement and restore original table state

### Options

```javascript
{
  // Pagination options
  perPage: 10,                    // Initial rows per page
  perPageOptions: [10, 25, 50, 100], // Available page size options

  // Column typing
  numericCols: [2, 3],            // 0-based column indexes for numeric sorting
  dateCols: [4],                  // 0-based column indexes for date sorting

  // Labels (customizable text)
  labels: {
    search: 'Search',
    rows: 'Rows',
    info: (start, end, total) => `Showing ${start}–${end} of ${total} entries`,
    noData: 'No data'
  }
}
```

## 🎯 Usage Examples

### Multiple Tables

```javascript
// Enhance all tables on the page
VTE.enhance('table');

// Enhance multiple specific tables
VTE.enhance(['#table1', '#table2']);
```

### Custom Configuration

```javascript
VTE.enhance('#myTable', {
  perPage: 25,
  perPageOptions: [10, 25, 50, 100, 200],
  labels: {
    search: 'Filter',
    rows: 'Items per page',
    info: (start, end, total) => `${start}-${end} of ${total}`,
    noData: 'No matches found'
  }
});
```

### Column Typing

There are two ways to specify column types for proper sorting:

#### Method 1: HTML Attributes (Recommended)

Add `data-vte="number"` or `data-vte="date"` to your `<th>` elements:

```html
<table id="myTable">
  <thead>
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th data-vte="number">Quantity</th>
      <th data-vte="date">Date</th>
    </tr>
  </thead>
  <!-- ... -->
</table>
```

#### Method 2: JavaScript Options

```javascript
VTE.enhance('#myTable', {
  numericCols: [1, 2],  // Price and Quantity columns
  dateCols: [3]        // Date column
});
```

### Dynamic Data Updates

After updating table data programmatically, refresh the enhancement:

```javascript
const controller = VTE.enhance('#myTable')[0];

// Later, after adding/removing rows...
controller.refresh();
```

### Remove Enhancement

```javascript
const controller = VTE.enhance('#myTable')[0];

// Remove all enhancements and restore original table
controller.destroy();
```

## 🎨 Styling

The library includes minimal, mobile-friendly styling. All elements use prefixed CSS classes:

- `.vte-bar` - Main control bar container
- `.vte-left` - Left side (search)
- `.vte-right` - Right side (pagination controls)
- `.vte-input` - Search input
- `.vte-select` - Rows per page selector
- `.vte-page` - Pagination buttons
- `.vte-info` - Info text
- `th[data-vte-sort]` - Sortable column headers

You can override any styles to match your design. The base styles are mobile-responsive.

### Custom CSS Example

```css
.vte-input {
  border: 2px solid #your-color;
  border-radius: 5px;
}

.vte-page.active {
  background: #your-accent-color;
}
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE11+ (with polyfills for `Array.from`, `Set`, and arrow functions)

For IE11 support, include polyfills before the library:

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=Array.from,Set"></script>
<script src="dist/vanilla-table-enhancer.js"></script>
```

## 📖 Examples

See the [`examples/`](examples/) directory for complete working examples:

- `basic.html` - Simple table enhancement
- `multiple-tables.html` - Multiple tables on one page
- `custom-styling.html` - Custom CSS styling
- `column-typing.html` - Number and date column examples

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on:

- Code of Conduct
- Development setup
- Pull request process
- Issue reporting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with pure vanilla JavaScript - no frameworks required
- Inspired by the need for a simple, dependency-free table enhancement solution

## 📞 Support

- 🐛 [Report a Bug](https://github.com/bsekhosana/vanilla-table-enhancer/issues/new?template=bug_report.md)
- 💡 [Request a Feature](https://github.com/bsekhosana/vanilla-table-enhancer/issues/new?template=feature_request.md)
- 📚 [View Documentation](https://github.com/bsekhosana/vanilla-table-enhancer#readme)

---

Made with ❤️ by [bsekhosana](https://github.com/bsekhosana)

