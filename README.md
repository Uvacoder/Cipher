# Cipher

*This is an ecnryption tool that implements Feistel Cipher and allows to encrypt and decrypt any text string - inluding all languages characters, symbols and emojis.*

### Links
#### **[Demo](https://www.cipher.ovh/)**
#### **[Documentation](https://www.cipher.ovh/docs)**

### Motivation

This tool was created for the recruitment process and as a portfolio. As well to to learn and improve programming skills.

### Password

> **Password** : *admin*

As mentioned above, this tool was created for the recruitment process which required logging in, thus the password is made public.

## Feistel Cipher implementation

You can read how Feistel Cipher works on [Wikipedia](https://en.wikipedia.org/wiki/Feistel_cipher)

Diagram below shows basic usage:

![enter image description here](https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Feistel_cipher_diagram_en.svg/410px-Feistel_cipher_diagram_en.svg.png)

### Algorithm assumptions:
 - Encrypting function F defined as one of:
	 - xor
	 - or
	 - and
	 - signed right shift
 - Round-dependant key (sub-key) creation function:
    1. Define master key as hashed user provided key (string) with sh256 hash function truncated to 64bit hash
    2. Round subkey is defined as sha256 of _master key_ + _round number_ + _round number to the power of 37_ truncated to 64bit hash
- Every character is represented in 16bit format
- Every block size has size of 128bit
- Key size is 64bit
- Padding character is defined as Unicode End of Text (\u0003)
- In order to provide user friendly encrypted text, result of algorithm is converted to Base64 on input and output.

### Algorithm steps:
##### Encryption
1. Divide input string into 128bit blocks
    - Due to asumptions every single block has 8 characters (block size 128bit / char size 16bit)
    - Last block is filled with padding character when necessary - less than 8 characters
2. Every block is processed separately
3. Each block input text is converted to binary represantation
4. Core Feistel Cipher alhorithm is executed
   - Binary input is split into two equal pieces
   - In each round right halft of the block goes through unchanged and becomes new left
   - Left half is XOR-ed with output of encryption function F that takes right side and round key as parameters - result of that becomes new left
   - Once the last round is completed - right side is swapped with left.
5. Concatenate results from each block converted back to UTF16 string as final cipher

##### Decryption
1. Same as encryption process but order of applied keys is reversed.
2. Possible padding characters (\u0003) are removed from final text.
 
### Tests
Cipher app includes unit tests created with [JEST.js](https://jestjs.io/)

### Documentation
Documentation created with [JSDoc](https://jsdoc.app/)

Available at **[cipher.ovh/docs](https://www.cipher.ovh/docs/)**

### Available Scripts

```
npm run start - Runs the app in the development mode
npm run test - Runs all tests
npm run build - Builds the app for production to the build folder
npm run docs - Generates docs in docs folder
```
****
&copy; May 2021 Patryk Bura