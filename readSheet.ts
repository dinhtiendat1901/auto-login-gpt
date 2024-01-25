import {google} from "googleapis";
import {JWT} from "google-auth-library";
import * as fs from "fs";

interface gptAccount {
    id: string,
    password: string
}

const spreadsheetId = "1Brj3H7I2eO0m2c4a7I7bo2PqCsaPeeHrIugr5KwFxTs";

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

    await getData('A10:A10', 'A11:A11');
    await getData('A14:A14', 'A15:A15');
    await getData('A18:A18', 'A19:A19');
    await getData('A22:A22', 'A23:A23');
    await getData('A26:A26', 'A27:A27');
    return listAccount;
}