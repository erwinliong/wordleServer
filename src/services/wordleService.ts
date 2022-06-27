import https from 'https';


async function getAllWords(): Promise<string[]> {
    const url = 'https://gist.githubusercontent.com/dracos/dd0668f281e685bad51479e5acaadb93/raw/ca9018b32e963292473841fb55fd5a62176769b5/valid-wordle-words.txt';
    let promise = new Promise((resolve, reject)=> {
        let data: string|string[] = '';
        https.get(url, res => {
            res.on('data', chunk => { data += chunk })
            res.on('end', () => {
                data = (data as string).split('\n');
                resolve(data);
            })
        })
    });

    let result = await promise; // wait until the promise resolves
    return result as string[];
}

// Export default
export default {
    getAllWords,
} as const;