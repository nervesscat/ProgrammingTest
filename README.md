# Dependencies Resolver Project

## Description

[Github Repository](https://github.com/nervesscat/ProgrammingTest)

This project is a simple implementation of a dependency resolver. It takes a list of packages with their dependencies and returns a list of the full set packages.

This took me around 7 hours to complete, including the tests and the documentation.

## How to run

To run the project, you need to have Node.js installed. Then, you can run the following commands:

```bash
npm main.js
```

Then you should type the name of the file containing the packages and their dependencies `INPUT3.txt` for example. The file should be in the following format:

```text
A depends on B C
B depends on D E
C depends on F G
D depends on A
E depends on C
```

The output will be the full set of packages in the correct order.

```text
A depends on B C D E
B depends on A C D E
C depends on F G
D depends on A B C E
E depends on C F G
```

## Running the tests

To run the tests, you need to have Node.js installed. Then you can run the following commands:

```bash
npm test
```

## Assumptions

### Format

It's important to note that the project assumes that the input file is in the correct format, for example you can't write `A depends onB C D` or `Bdepends on A` as the project will not be able to parse the file correctly. There should be a space between the package name and the `depends on` keyword and between the `depends on` keyword and the dependencies.

The library handle circular dependencies, for example, if you have the following input:

```text
A depends on B
B depends on A
```

The output will be:

```text
A depends on B
B depends on A
```

### Extra spaces

It also manages extra spaces between the package name and the `depends on` keyword and between the `depends on` keyword and the dependencies. For example, the following input:

```text
A depends on B C
B depends on D E
C depends on F  G
```

Will be parsed correctly and the output will be:

```text
A depends on B C D E F G
B depends on A C D E F G
C depends on F G A B D E
```

### Naming Rules

The name of the library follows the JavaScript naming rules, it should start with a letter and can contain letters, numbers, underscores and $. The library is case sensitive, so `A` and `a` are considered different libraries.

```text
C_4T depends on B
D depends on C C_4T
```

The output will be:

```text
C_4T depends on B
D depends on C C_4T B
```

### Empty Libraries

Also it could handle empty libraries, with no dependencies, for example:

```text
A depends on B C
B depends on
C depends on A
```

The output will be:

```text
A depends on B C
B depends on
C depends on A B
```

### Self dependencies

The library also handles self dependencies, and delete them for example:

```text
A depends on A
```

The output will be:

```text
A depends on
```

## How it works

All the logic of the project is in the pdf `Reasoning Process.pdf`. The project uses a map to represent the dependencies between the packages. The map is built by parsing the input file.

It uses recursive depth-first search to traverse the map and find the full set of packages. The project uses a set to keep track of the visited nodes and avoid infinite loops in the case of circular dependencies.

If some line is not in the correct format, the project will throw continue parsing the file, but discard the line and continue with the next one.
