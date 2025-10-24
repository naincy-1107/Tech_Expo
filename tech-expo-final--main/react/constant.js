export const LANGUAGE_VERSIONS = {
    javascript: "18.15.0",
    typescript: "5.0.3",
    python :"3.10.0",
    java: "15.0.2",
    csharp :"6.12.0",
    php :"8.2.3"
}

export const CODE_SNIPPETS = {
  javascript: `console.log("Hello, JavaScript!");`,

  typescript: `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("TypeScript"));`,

  python: `def greet(name):
    return f"Hello, {name}!"

print(greet("Python"))`,

  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`,

  csharp: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, C#!");
    }
}`,

  php: `<?php
echo "Hello, PHP!";
?>`
};
