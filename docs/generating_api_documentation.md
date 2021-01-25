# Writing and Generating API Documentation

## API generation instructions:
1. `npm run generate-api-documentation`
1. Clone the code from https://github.com/seankwilliams/comrad-documentation
1. Run `npm i` in the `comrad-documentation` directory.
1. Check out the `main` branch
1. Replace the `source/index.md` file in the `comrad-documentation` repo with the `/comradApi.md` code in the `comrad` repo
1. Test your changes by running `npm run serve` in the `comrad-documentation` repo and accessing the documentation at `http://localhost:4567/`
1. In the `comrad-documentation` repo, run `npm run build`
1. Commit and push your changes.
1. Switch to the `gh-pages` branch in the `comrad-documentation` repo.
1. Copy the contents of the `/_site` folder to the root folder of the `gh-pages` branch
1. Commit and push your changes.

## Writing API documentation
API documentation is at the top of controller and model files in YAML. This is converted to an OpenAPI v3 file later on using swagger-to-json.

## Modifying documentation templates
The `/documentationTemplates` folder contains templateas used to generate the files for the documentation.

To modify the "Getting Started" section in the documentation, search for `# Getting Started` in the file at `/documentationTemplates/main.dot`
