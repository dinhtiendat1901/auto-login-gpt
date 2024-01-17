import {google} from "googleapis";
import {JWT} from "google-auth-library";
import * as fs from "fs";

interface gptAccount {
    id: string,
    password: string
}

const spreadsheetId = "1U3-1LHmcDC_TW-pv2xZlqui3hCM4C6Q_F6j6cEnVxoc";

async function getServiceAccountKey() {
    const data = await fs.promises.readFile('service-account-key.json', 'utf8');
    return JSON.parse(data);
}

export default async function getListAccount(): Promise<gptAccount[]> {
    let listAccount: gptAccount[] = [];
    const credentials = await getServiceAccountKey();
    const client = new JWT({
        email: credentials.client_email,
        key: credentials.private_key,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({version: "v4", auth: client});

    async function getData(idRow: string, passwordRow: string) {
        const id = (await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: idRow,
        })).data.values![0].join('\t').split(':')[1];
        const password = (await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: passwordRow,
        })).data.values![0].join('\t').split(':')[1];

        listAccount.push({id, password});
    }
    await getData('A35:A35', 'A36:A36');
    await getData('A13:A13', 'A14:A14');
    await getData('A17:A17', 'A18:A18');
    await getData('A21:A21', 'A22:A22');
    await getData('A25:A25', 'A26:A26');
    await getData('A29:A29', 'A30:A30');
    return listAccount;
}