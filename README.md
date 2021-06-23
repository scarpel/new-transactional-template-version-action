# New Transactional Template Version Action

This action creates a new transactional template version in SendGrid.

## Inputs

## `html-file-path`

**Required** File path containing the HTML file of the new transactional template version.

## `name`

**Required** The name of the transactional template version.

## `subject`

The subject of the transactional template version. Default ({{{ subject }}})

## `api-key`

**Required** The API key of SendGrid.

## `template-id`

The template id of the existing transactional template. Must be included if the lookup table file path it's not.

## `lookup-table-file-path`

File path containg a lookup table with the corresponding template ids based on the HTML file name. Must be included if the template id is not.

## `active`

If the new transactional template version will be the active one. Default 1 (true).

## Outputs

## `status`

The status of the post request

## Example usage

uses: scarpel/new-transactional-template-version-action@v1.1
with:
html-file-path: './new-version.html'
name: 'New Version',
subject: 'The new version of the template'
api-key: XXXXXXXXXX,
template-id: d-a38fu334ndiq49tjfbq
