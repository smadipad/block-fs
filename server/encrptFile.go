package main

import (
	"crypto/rand"
	"io"
	"os"

	"golang.org/x/crypto/chacha20poly1305"
)

func encryptFile(key []byte, inputFile string, outputFile string) error {
	// Open the input file
	input, err := os.Open(inputFile)
	if err != nil {
		return err
	}
	defer input.Close()

	// Create the output file
	output, err := os.Create(outputFile)
	if err != nil {
		return err
	}
	defer output.Close()

	// Generate a new random nonce
	nonce := make([]byte, chacha20poly1305.NonceSizeX)
	if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
		return err
	}

	// Write the nonce to the output file
	if _, err := output.Write(nonce); err != nil {
		return err
	}

	// Create a new XChaCha20-Poly1305 cipher using the provided key
	cipher, err := chacha20poly1305.NewX(key)
	if err != nil {
		return err
	}

	// Encrypt the input file and write the result to the output file
	_, err = output.Write(cipher.Seal(nil, nonce, input.ReadBytes))
	if err != nil {
		return err
	}

	return nil
}
