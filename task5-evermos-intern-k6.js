import http from 'k6/http';
import { check } from "k6";

/* This will export to HTML as filename "result.html" 
AND also stdout using the text summary */
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.4.0/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
    vus: 1000,          // jumlah virtual user
    iterations: 3500,  //jumlah perulangan. nomor perulangan tidak boleh kurang dari vus
    duration: '2s',
};

export default function () {
    const resPOST = http.post('https://reqres.in/api/users');
    const payloadPOST = JSON.stringify({
        name: 'morpheus',
        job: 'leader'
    });
    const paramsPOST = {
        header: {
            'Content-Type': 'application/json',
        },
    };
    //assertion
    const checkOutputPOST = check (
        resPOST,
        {
            '[CREATE] response code was 201': (r) => r.status == 201,
        },
    );

    const resPUT = http.put('https://reqres.in/api/users/2');
    const payloadPUT = JSON.stringify({
        name: 'morpheus',
        job: 'zion resident'
    });
    const paramsPUT = {
        header: {
            'Content-Type': 'application/json',
        },
    };
    //assertion 2
    const checkOutputPUT = check (
        resPUT,
        {
            '[UPDATE] response code was 200': (rPUT) => rPUT.status == 200,
        },
    );
}
        //create file report
        export function handleSummary(data) {
            return {
                "result.html": htmlReport(data),
                stdout: textSummary(data, { indent: " ", enableColors: true }),
            };
        }