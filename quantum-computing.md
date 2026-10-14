---
title: "Quantum Computing"
permalink: /quantum-computing/
description: >-
  A mathematical, hands-on introduction to quantum computing: qubits and entanglement, the algorithms of Grover and Shor, their impact on cryptography, noise, and quantum error correction.
image:
  path: /assets/img/courses/quantum-computing-cover.png
  alt: Quantum Computing lecture notes
toc: true
---

![Course cover](/assets/img/courses/quantum-computing-cover.png){: .shadow }

These notes were written for students who know linear algebra and some Python,
and who want to understand quantum computing as mathematics rather than as
magic. No physics is assumed. A first course in probability and statistics
helps, since every quantum measurement is a sample. The course runs from a
single qubit to Shor's algorithm, asks what that means for the cryptography we
rely on today, and ends with the noise, error correction and fault tolerance
that a real machine needs. Every lecture is one web page with interactive
figures, spot-check questions and worked exercises; nothing needs to be
installed to read them.

**How to read them.** The lectures are meant to be read in order, since each
one leans on the last. Each page has short spot checks just after each new
idea: they turn green when you are right and give a hint when you are not, so
use them to make sure an idea has landed before reading the examples that build
on it. Code examples use [Qiskit](https://www.ibm.com/quantum/qiskit) and run
on a laptop; a few optional examples use IBM's free cloud quantum hardware.

## Contents

### Part I — Quantum information basics

| | Lecture | |
|---|---|---|
| 1 | [Why Quantum?](/assets/courses/quantum-computing/QC-L01-why-quantum-notes.html) | bits, probabilistic bits, amplitudes |
| 2 | [Complex Linear Algebra for Qubits](/assets/courses/quantum-computing/QC-L02-complex-linear-algebra-notes.html) | Dirac notation, unitaries, the spectral theorem |
| 3 | [The Qubit](/assets/courses/quantum-computing/QC-L03-the-qubit-notes.html) | the Born rule and the Bloch sphere |
| 4 | [Single-Qubit Gates](/assets/courses/quantum-computing/QC-L04-single-qubit-gates-notes.html) | gates as rotations, measuring in other bases |
| 5 | [Multiple Qubits](/assets/courses/quantum-computing/QC-L05-multiple-qubits-notes.html) | tensor products, the SVD, entanglement |
| 6 | [Two-Qubit Gates and Bell States](/assets/courses/quantum-computing/QC-L06-two-qubit-gates-notes.html) | CNOT, partial measurement, kickback |
| 7 | [Circuits, Reversibility and Universality](/assets/courses/quantum-computing/QC-L07-circuits-reversibility-notes.html) | what a quantum computer can compute |
| 8 | [No-Cloning, Teleportation, Superdense Coding](/assets/courses/quantum-computing/QC-L08-teleportation-notes.html) | entanglement as a resource |

### Part II — Quantum algorithms

| | Lecture | |
|---|---|---|
| 9 | [The Query Model](/assets/courses/quantum-computing/QC-L09-query-algorithms-notes.html) | Deutsch–Jozsa and Bernstein–Vazirani |
| 10 | [Simon's Algorithm and Complexity](/assets/courses/quantum-computing/QC-L10-simon-complexity-notes.html) | the first exponential separation |
| 11 | [Grover's Search](/assets/courses/quantum-computing/QC-L11-grover-notes.html) | search as a rotation |
| 12 | [Amplitude Amplification](/assets/courses/quantum-computing/QC-L12-amplification-crypto-notes.html) | Grover against keys and hashes |
| 13 | [The Quantum Fourier Transform](/assets/courses/quantum-computing/QC-L13-qft-notes.html) | periodicity in amplitudes |
| 14 | [Phase Estimation](/assets/courses/quantum-computing/QC-L14-phase-estimation-notes.html) | reading an eigenvalue |
| 15 | [Shor's Algorithm I](/assets/courses/quantum-computing/QC-L15-shor-order-finding-notes.html) | order finding and factoring |
| 16 | [Shor's Algorithm II](/assets/courses/quantum-computing/QC-L16-shor-dlog-hsp-notes.html) | circuits, discrete logs, hidden subgroups |
| 17 | [Cryptographic Impact](/assets/courses/quantum-computing/QC-L17-crypto-impact-notes.html) | resource estimates and post-quantum cryptography |

### Part III — Noise and quantum cryptography

| | Lecture | |
|---|---|---|
| 18 | [Density Matrices and Channels](/assets/courses/quantum-computing/QC-L18-density-matrices-channels-notes.html) | mixed states and noise models |
| 19 | [Noise on Real Hardware](/assets/courses/quantum-computing/QC-L19-noise-mitigation-notes.html) | calibration data and error mitigation |
| 20 | [Quantum Key Distribution](/assets/courses/quantum-computing/QC-L20-qkd-bb84-e91-notes.html) | BB84, E91 and privacy amplification |
| 21 | [From Classical to Quantum Codes](/assets/courses/quantum-computing/QC-L21-classical-to-quantum-codes-notes.html) | syndromes and Shor's nine-qubit code |

### Part IV — Error correction and the road ahead

| | Lecture | |
|---|---|---|
| 22 | [Stabilizers and CSS Codes](/assets/courses/quantum-computing/QC-L22-stabilizers-css-notes.html) | the Steane code and Gottesman–Knill |
| 23 | [Surface Codes and Fault Tolerance](/assets/courses/quantum-computing/QC-L23-surface-codes-notes.html) | thresholds, decoders, below-threshold memories |
| 24 | [Near-Term Algorithms](/assets/courses/quantum-computing/QC-L24-near-term-algorithms-notes.html) | VQE, QAOA and honest advantage |

## Acknowledgements and licence

License: CC BY-NC-SA 4.0

Acknowledgments: These notes were developed using Anthropic's Claude, Opus 5.5 model.
