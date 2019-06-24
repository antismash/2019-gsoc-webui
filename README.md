# AntiSmash Redesign

## Running Project Locally:

### Running Dummy server
* create a file called server.json with following content-
```
    {
        "stats": {
            "fast": 0,
            "legacy": 31,
            "queue_length": 0,
            "running": 1,
            "status": "working",
            "total_jobs": 509017,
            "ts_fast": null,
            "ts_fast_m": null,
            "ts_legacy": "2019-04-01 23:24",
            "ts_legacy_m": "2019-04-01T23:24:37Z",
            "ts_queued": null,
            "ts_queued_m": null
        },
        "news": {
            "notices": [
                {
                    "added": "2019-01-21 12:29:09.961799",
                    "category": "info",
                    "show_from": "2019-01-21 12:29:09.959806",
                    "show_until": "2019-01-28 12:29:09.959806",
                    "teaser": "Incomplete RefSeq annotations",
                    "text": "Dear antiSMASH users, it has come to our attention that a recent RefSeq reannotation again broke NRPS/PKS ORFs. If your results look weird, try uploading the corresponding GenBank record or a FASTA file."
                }
            ]
        }
    }
```
* install json-server globally

    ``` npm install -g json-server```

* Run dummy server

    ``` json-server server.json -p 3010 -d 2000```

    -d add delay time of 2000ms in sending the response. This is just for the purpose of simulating remote server like experience to the client.


### Start client using webpack
    
   * ``` git clone https://github.com/antismash/2019-gsoc-webui.git ```
   * ``` npm install ```
   * ``` npm start ```

### Using various components
Include following custom tags into index.html -
* Stats component: ```<server-stats></server-stats>```
* News component: ```<server-news></server-news>```
* Error component:
    
    ```<server-news type="error" heading="HEADING OF ERROR" text="TEXT TO BE SHOWN (BELOW HEADING)"></server-news>```

### Useful Links
* A demo project on lit-html : https://github.com/Polymer/lit-html/blob/master/demo/clock

* YouTube links:

    https://www.youtube.com/watch?v=Io6JjgckHbg

    https://www.youtube.com/watch?v=ypPRdtjGooc

* HTMLElement Interface: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
