// tslint:disable-next-line: no-var-requires
const toWav = require('audiobuffer-to-wav');
// tslint:disable-next-line: no-var-requires
const AudioContext = require('web-audio-api').AudioContext;
const context = new AudioContext();
// tslint:disable-next-line: no-var-requires
const fs = require('fs');
export class HelpersUtils {
  public static eq(value: string | boolean | number, expectedValue: string | boolean | number) {
    // tslint:disable-next-line: ter-indent
    return value === expectedValue;
  }
  public static lt(value: string | boolean | number, expectedValue: string | boolean | number) {
    return value < expectedValue;
  }
  public static gt(value: string | boolean | number, expectedValue: string | boolean | number) {
    return value > expectedValue;
  }
  public static ne(value: string | boolean | number, expectedValue: string | boolean | number) {
    return value !== expectedValue;
  }
  public static getMean(data: number[]) {
    return (
      data.reduce((a, b) => {
        return Number(a) + Number(b);
      }) / data.length
    );
  }
  public static getSD(data: number[]) {
    const m = HelpersUtils.getMean(data);
    return Math.sqrt(
      data.reduce((sq, n) => {
        return sq + Math.pow(n - m, 2);
        // tslint:disable-next-line: align
      }, 0) /
      (data.length - 1)
    );
  }
  public static getMinMax = (data: number[]) => {
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
  public static closestNumber = (data: number[], needle: number) => {
    return data.reduce((a, b) => {
      return Math.abs(b - needle) < Math.abs(a - needle) ? b : a;
    });
  };
  public static groupBy = (items: any[], key: string) =>
    items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item]
      }),
      {}
    );
  public static deepFlatten = (array: any[]) => {
    let result: any[] = [];

    array.forEach((elem) => {
      if (Array.isArray(elem)) {
        result = result.concat(HelpersUtils.deepFlatten(elem)); // Fix here
      } else {
        result.push(elem);
      }
    });

    return result;
  };
  public static convertToWavBas64(file: Express.Multer.File): Promise<{ audio: any }> {
    return new Promise((resolve, reject) => {
      context.decodeAudioData(file.buffer, (buffer: any) => {
        // encode AudioBuffer to WAV
        const wav = toWav(buffer);
        const chunk = new Uint8Array(wav);
        resolve({ audio: HelpersUtils.base64ArrayBuffer(chunk.buffer) });
      });
    });
  }
  public static convertToWav(file: Express.Multer.File): Promise<{ audio: any }> {
    return new Promise((resolve, reject) => {
      context.decodeAudioData(file.buffer, (buffer: any) => {
        const wav = toWav(buffer);
        resolve({ audio: new Buffer(wav) });
      });
    });
  }
  public static getAudioDuration(file: Express.Multer.File): Promise<number> {
    return new Promise((resolve, reject) => {
      context.decodeAudioData(file.buffer, (buffer: any) => {
        resolve(buffer.duration);
      });
    });
  }
  public static base64ArrayBuffer(arrayBuffer: any) {
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
    } else if (byteRemainder === 2) {
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
