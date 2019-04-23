# ghost-gcs
Ghost.org Google Cloud Storage adapter

## Installation

### Install from Git

- Go into Ghost root directory
- Navigate to the `/content/adapters/storage` directory
- Download the adpater:

```bash
$ git clone https://github.com/thomas-vl/ghost-gcs.git
```

- Install dependencies:

```bash
$ cd ghost-gcs
$ npm install
```

## Configuration
"storage": {
    "active": "ghost-gcs",
    "ghost-gcs": {
        "projectId": "projectid",
        "key": "credentials.json",
        "bucket": "bucketname",
    }

