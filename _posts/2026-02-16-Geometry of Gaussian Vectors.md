---
title: The Geometry of Gaussian Vectors 
data: 2026-02-16 08:00:00 -0500
categories: [Statistics, Geometry]
tags: [vectors, gaussian, linear-algebra]
author: <author_id> 
description: How the classical test statistics come from geometrical ideas of normally distributed vectors.  
math: true
---

In this post we will see how many of the classical test statistics $$z, t, F$$ come from viewing a random sample as defining a vector in space, and understanding the geometry of these vectors.

## 1 - Gaussian Vector

Let $$ X_1, \dots, X_n \sim N(\mu, \sigma^2)$$ be independent and identically distributed random variables. Each such random sample can be viewed as a vector $$(X_1, \dots, X_n) \in \mathbb{R}^n$$.