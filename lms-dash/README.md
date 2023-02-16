## LMS Dashboard

A learning management system admin/user dashboard prototype.

### Languages

Below are the languages that was used to achieve this prototype

- Typescript
- JavaScript
- Python

### Proposed Architecture

For this prototype to fit into the existing ecosystem, an architecture akin to the below should suffice.

1. A python client that queries the existing backend to get activity metrics
1. The python client then parses the metrics casting it into a shape
   suitable for the frontend dashboard
1. Ones the casting is completed the output will be store in a database.
1. Moving forward the dashboard can query the database as and when it needs to fetch the metrics.

```
  +-------------+   <--   +-------------+
  |    API      |         |   CLIENT    | ----+
  +-------------+         +-------------+     |
                                      |       |
                                      |       |----  CRON
                                      v       |     SERVICE
  +-------------+   <--   +-------------+     |
  |  DATABASE   |         |   PARSER    | ----+
  +-------------+         +-------------+
   |
   |
   v
  +-------------+
  | DASHBOARD   |
  +-------------+

```

### Submission Scope

As per the specification the core deliverables for this prototype was to understand the metics and generate further mock data. Also a showcase of what the dashboard will look like was also requisite. Below is an enumeration of the work done to this effect.

- Mock data extension using Python (Jupyter Notebook)

  > - The original dummy data was flattened to allow for it to be easily loaded into memory and consumed. `./python/script/flatten.ipynb`
  > - As part of the flattening, a schema was generated to capture all the fields for a pupil/student. `./python/data/schema/pupil.json`
  > - Utilising the schema, and the faker library, `50` more pupils were generated with randomise data. `./python/data/flat/extended.json`
  > - Finally the `./python /script/extract` script was employed to extract metrics useful metrics to display on the frontend.

- React based frontend setup

  > A react based project bundled with webpack was setup. This include dependencies for charting and UI (apexchart and antd).

- Deployment

  > Finally, a github pages env was setup to host the prototype.
