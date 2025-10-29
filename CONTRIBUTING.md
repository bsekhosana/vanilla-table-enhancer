# Contributing to Vanilla Table Enhancer

First off, thank you for considering contributing to Vanilla Table Enhancer! It's people like you that make this project better.

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before participating.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list to avoid duplicates. When you create a bug report, include as many details as possible:

- **Clear Title**: Describe the issue in a few words
- **Steps to Reproduce**: Detailed steps to reproduce the behavior
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Environment**: Browser, OS, library version
- **Screenshots**: If applicable, add screenshots

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Clear Title**: Describe the enhancement
- **Use Case**: Explain why this enhancement would be useful
- **Possible Solution**: If you have ideas, share them!

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Make your changes** following the project's code style
3. **Test your changes** - ensure they work in multiple browsers
4. **Update documentation** if you've changed the API
5. **Commit your changes** with clear, descriptive messages
6. **Push to your fork** and submit a pull request

#### Pull Request Guidelines

- Keep PRs focused - one feature or fix per PR
- Update the README or docs if needed
- Add examples if introducing new features
- Ensure code follows the existing style (vanilla JS, ES5-compatible where possible)

### Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/vanilla-table-enhancer.git
cd vanilla-table-enhancer

# Install dependencies (if any are added in the future)
npm install

# Build the distribution files
npm run build
```

### Code Style

- Use vanilla JavaScript (ES5 where possible for maximum compatibility)
- Use `'use strict';`
- Comment complex logic
- Keep functions focused and small
- Maintain existing code style and formatting

### Testing

While there's no formal test suite yet, please test your changes:

- In multiple browsers (Chrome, Firefox, Safari, Edge)
- On mobile devices if applicable
- With different table sizes and structures
- Ensure no console errors

## Project Structure

```
vanilla-table-enhancer/
├── src/              # Source files
├── dist/             # Distribution files (built)
├── examples/         # Example HTML files
├── docs/             # Additional documentation
└── .github/          # GitHub templates
```

## Questions?

Feel free to open an issue for any questions about contributing. We're happy to help!

Thank you for contributing! 🎉

