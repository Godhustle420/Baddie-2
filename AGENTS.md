# AGENTS Instructions

## Scope
These instructions apply to the entire repository unless another `AGENTS.md` is added inside a subdirectory.

## General Guidelines
- Favor semantic HTML elements and keep indentation at 4 spaces for readability.
- Keep CSS changes inside `assets/css/styles.css` unless a new stylesheet is absolutely necessary.
- Place JavaScript enhancements inside `assets/js/app.js` or `assets/js/social-integration.js` depending on the concern.
- When adding new assets, store them in the corresponding `assets/images` or `assets/icons` directories and reference them with relative paths.
- Ensure any new sections you add to the HTML files include descriptive class names that match existing naming conventions (kebab-case).

## Testing Guidelines
For static site changes, manually verify rendering using a local web server:
```bash
python -m http.server 8000
```
Navigate to `http://localhost:8000` and confirm affected sections render correctly on desktop and mobile breakpoints using browser dev tools.

## Documentation & PR Notes
- Mention any new sections, components, or assets in the pull request description.
- If you introduce configuration values (like pixel IDs), document them in `SETUP.md`.
