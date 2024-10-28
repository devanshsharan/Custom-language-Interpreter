// sharedOutput.ts

export let accumulatedOutput = ""; // Shared output variable

export function resetOutput() {
    accumulatedOutput = ""; // Function to reset the output
}

export function appendOutput(message: string) {
    accumulatedOutput += message + "\n"; // Function to append to output
}

export function getOutput() {
    return accumulatedOutput; // Function to retrieve the current output
}

