---
title: Solving Equations - The World's Oldest Profession
data: 2026-03-28 08:00:00 -0500
categories: [Math, Algebra]
tags: [fields, groups, equations]
author: <author_id>
description: How Galois Theory explains the art and possibility of solving algebraic equations.
---
From an early age, everyone experiences the joy and mediation of solving equations such as:

$$
x^2 - 4 = 0
$$

which through direct factoring

$$
(x + 2)(x-2) = 0
$$

gives the unique solutions $x = \pm 2$. Some equations can be more complicated: 

$$
x^2 + 2x - 15 = 0
$$

and the solution may seem elusive, until one observes the factoring

$$
x^2 + 2x - 15 = (x - 5)(x+3) = 0
$$

which then easily gives unique solutions $x = -3, 5$. Sometimes, factoring into whole numbers fails, and it seems no such solution can exist. For instance, there is no way to use factorization into integers for the following equation:

$$
x^2 - 2 = 0
$$


## Equations Force Symmetry

Write down an equation. Let's say a _quadratic_ equation. Something like $x^2 + x + 1$ or $2x^2 - 3x+4$. Here we are writing all of the coefficents as whole numbers (or we say: elements of the integers $\mathbb{Z}$). These equations may seem arbitrary, but in fact, when we write equations with integral coefficients, it forces the roots of the equation to satisfy certain symmetries. For instance, when we write: 

$$
x^2 -4 = 0

$$

we see that the roots $x = \pm 2$ have some symmetry, namely we can swap $x=-2 \Leftrightarrow x=2$.

## What is a Formula?

It may seem mysterious (or it did at least to me!) that we can even speak about the existence or nonexistence of formulas. Why can't we write down a formula? What exactly stops me from taking ink to paper to write a formula down? Another beautiful abstraction of Galois Theory is the move away from formulas and towards the theory of field extensions. Let me explain how this goes. 

A formula, like $x = \frac{3}{7} + \frac{5}{7}\sqrt{2}$ is really a recipe to specify the number $x$, by _extending_ what we call a number. For instance, $x$ here is built by taking the rational numbers $\frac{3}{7}$ and $\frac{5}{7}$ and extending it by the _irrational_ number $\sqrt{2}$. That is, to specify $x$ we must extend the rationals $\mathbb{Q}$ with the number $\sqrt{2}$. The smallest such object that contains both $\mathbb{Q}$ and $\sqrt{2}$ is the field $\mathbb{Q}(\sqrt{2}) = \{a + b \sqrt{2} ~|~ a,b \in \mathbb{Q} \}$. Therefore, the formula for $x$ is really an extension of fields $\mathbb{Q} < \mathbb{Q}(\sqrt{2})$.
