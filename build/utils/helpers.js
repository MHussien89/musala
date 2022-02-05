// tslint:disable-next-line: no-var-requires
const toWav = require('audiobuffer-to-wav');
// tslint:disable-next-line: no-var-requires
const AudioContext = require('web-audio-api').AudioContext;
const context = new AudioContext();
// tslint:disable-next-line: no-var-requires
const fs = require('fs');
let HelpersUtils = /** @class */ (() => {
    class HelpersUtils {
        static eq(value, expectedValue) {
            // tslint:disable-next-line: ter-indent
            return value === expectedValue;
        }
        static lt(value, expectedValue) {
            return value < expectedValue;
        }
        static gt(value, expectedValue) {
            return value > expectedValue;
        }
        static ne(value, expectedValue) {
            return value !== expectedValue;
        }
        static getMean(data) {
            return (data.reduce((a, b) => {
                return Number(a) + Number(b);
            }) / data.length);
        }
        static getSD(data) {
            const m = HelpersUtils.getMean(data);
            return Math.sqrt(data.reduce((sq, n) => {
                return sq + Math.pow(n - m, 2);
                // tslint:disable-next-line: align
            }, 0) /
                (data.length - 1));
        }
        static convertToWavBas64(file) {
            return new Promise((resolve, reject) => {
                context.decodeAudioData(file.buffer, (buffer) => {
                    // encode AudioBuffer to WAV
                    const wav = toWav(buffer);
                    const chunk = new Uint8Array(wav);
                    resolve({ audio: HelpersUtils.base64ArrayBuffer(chunk.buffer) });
                });
            });
        }
        static convertToWav(file) {
            return new Promise((resolve, reject) => {
                context.decodeAudioData(file.buffer, (buffer) => {
                    const wav = toWav(buffer);
                    resolve({ audio: new Buffer(wav) });
                });
            });
        }
        static getAudioDuration(file) {
            return new Promise((resolve, reject) => {
                context.decodeAudioData(file.buffer, (buffer) => {
                    resolve(buffer.duration);
                });
            });
        }
        static base64ArrayBuffer(arrayBuffer) {
            let base64 = '';
            const encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
            const bytes = new Uint8Array(arrayBuffer);
            const byteLength = bytes.byteLength;
            const byteRemainder = byteLength % 3;
            const mainLength = byteLength - byteRemainder;
            // tslint:disable-next-line: one-variable-per-declaration
            let a, b, c, d;
            let chunk;
            // Main loop deals with bytes in chunks of 3
            for (let i = 0; i < mainLength; i = i + 3) {
                // Combine the three bytes into a single integer
                // tslint:disable-next-line: no-bitwise
                chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
                // Use bitmasks to extract 6-bit segments from the triplet
                // tslint:disable-next-line: no-bitwise
                a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
                // tslint:disable-next-line: no-bitwise
                b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
                // tslint:disable-next-line: no-bitwise
                c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
                // tslint:disable-next-line: no-bitwise
                d = chunk & 63; // 63       = 2^6 - 1
                // Convert the raw binary segments to the appropriate ASCII encoding
                base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
            }
            // Deal with the remaining bytes and padding
            // tslint:disable-next-line: triple-equals
            if (byteRemainder == 1) {
                chunk = bytes[mainLength];
                // tslint:disable-next-line: no-bitwise
                a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2
                // Set the 4 least significant bits to zero
                // tslint:disable-next-line: no-bitwise
                b = (chunk & 3) << 4; // 3   = 2^2 - 1
                base64 += encodings[a] + encodings[b] + '==';
            }
            else if (byteRemainder === 2) {
                // tslint:disable-next-line: no-bitwise
                chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
                // tslint:disable-next-line: no-bitwise
                a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
                // tslint:disable-next-line: no-bitwise
                b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4
                // Set the 2 least significant bits to zero
                // tslint:disable-next-line: no-bitwise
                c = (chunk & 15) << 2; // 15    = 2^4 - 1
                base64 += encodings[a] + encodings[b] + encodings[c] + '=';
            }
            return base64;
        }
    }
    HelpersUtils.getMinMax = (data) => {
        let min = data[0];
        let max = data[0];
        // tslint:disable-next-line: no-increment-decrement
        for (let i = 1; i < data.length; i++) {
            const value = data[i];
            min = value < min ? value : min;
            max = value > max ? value : max;
        }
        return [min, max];
    };
    HelpersUtils.closestNumber = (data, needle) => {
        return data.reduce((a, b) => {
            return Math.abs(b - needle) < Math.abs(a - needle) ? b : a;
        });
    };
    HelpersUtils.groupBy = (items, key) => items.reduce((result, item) => (Object.assign(Object.assign({}, result), { [item[key]]: [...(result[item[key]] || []), item] })), {});
    HelpersUtils.deepFlatten = (array) => {
        let result = [];
        array.forEach((elem) => {
            if (Array.isArray(elem)) {
                result = result.concat(HelpersUtils.deepFlatten(elem)); // Fix here
            }
            else {
                result.push(elem);
            }
        });
        return result;
    };
    return HelpersUtils;
})();
export { HelpersUtils };
//# sourceMappingURL=helpers.js.map