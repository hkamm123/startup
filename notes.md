# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)
- [Markdown Syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

## Git and Github repository

I've learned that using markdown to take notes in this way can help me keep a central location for all my work. Super cool!

## AWS

- My IP address is: 13.223.150.112
- The command to ssh into my server: `ssh -i [key pair file] ubuntu@13.223.150.112`
- My domain name is: [echowebprogramming.click](http://echowebprogramming.click)
- I learned:
  - how to create an AWS EC2 server instance
  - how to associate an elastic IP address to it
  - how to purchase a domain name from Route 53
  - how to use DNS records to connect my domain name to the IP address of my EC2 server

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).
I learned:
- how to edit the caddy file to allow https traffic and request certificates

## HTML

First HTML assignment went great. [CodePen](https://codepen.io/hkamm123/pen/VYvoxqB) is so easy to use, I can't believe I'd never heard of it before!

[HTML Input](https://codepen.io/hkamm123/pen/JoGPdvm) assignment was also a breeze.

[HTML Media](https://codepen.io/hkamm123/pen/JoGPZwm) assignment: I learned how to embed videos, which is pretty cool!

After the initial assignments, I created a simple html skeleton of my project with placeholders for all the technologies I will implement. Something cool that I learned is you can use a `<progress>` element to show progress in something, such as how much money has been spent in a budget category!

## CSS

[CSS Practice](https://codepen.io/hkamm123/pen/OPMLwpW) assignment was a good introduction to what can be dome with CSS. I loved learning about doing animations! I may implement that in my startup app.

I used [this codepen](https://codepen.io/hkamm123/pen/MYKadzN) to play around with flex styling in CSS. I learned about flex-direction, justify-content, and align-items.

The [practice with Bootstrap](https://codepen.io/hkamm123/pen/LEGGYBm?editors=1010) was very helpful.

In the Simon CSS part of this assignment, I learned that you can actually overwrite bootstrap, which is very interesting!

Headers and nav items are so hard to style. What I eventually ended up doing was using a combination of bootstrap and normal css. I imported bootstrap through the link tag and then used some flex attributes and text styling to get around the trickier default styles of the li elements.

I realized the recipe of the day should be in the body instead of the footer to make the footer nice and small.

When working with the budget categories, I learned about using `@media` to change the css based on the width of the screen. This made it possible to display the categories horizontally on a wider screen, and vertically on a narrower screen. I'm not sure how this will scale in the future with multiple categories though. I may need to change it later.

## React Part 1: Routing

I had fun setting up Vite and React. I only learned the basics of how to get the template app working, but I'm excited to learn more as I try to build a powerful budget app with these tools.

I used [this codepen](https://codepen.io/hkamm123/pen/myVOqwE) to learn about how to use state and events to change component style. [This codepen](https://codepen.io/hkamm123/pen/OPMbzMZ) also helped me learn about routing and having nested components.

After converting the simon app over to React, I feel like I have a little better grasp on the power of Vite, React, and routing. Following that pattern, I was able to convert my own project over. I had some issues with stylying, which I was eventually able to resolve by getting rid of/changing some parent elements that were added due to the nature of react routing.

The practice with JavaScript arrays and first class functions was fun. I learned about a very helpful built-in array method called `every`, which returns true if every item in the array makes a given predicate function return true.

I learned a little about how react useState works with [this codepen](https://codepen.io/hkamm123/pen/ogbwLrm). Also used [this one](https://codepen.io/hkamm123/pen/dPGRpXB) to learn about the JS DOM.

## React Part 2: Reactivity

I learned what it means to "push state up" in React, which gives me the ability to pass variables and objects between components.

### JavaScript Promises and Async/Await
A simple example of using promises:
``` js
const coinToss = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.1) {
      resolve(Math.random() > 0.5 ? 'heads' : 'tails');
    } else {
      reject('fell off table');
    }
  }, 10000);
});

coinToss
  .then((result) => console.log(`Coin toss result: ${result}`))
  .catch((err) => console.log(`Error: ${err}`))
  .finally(() => console.log('Toss completed'));

// OUTPUT:
//    Coin toss result: tails
//    Toss completed
```
[this codepen](https://codepen.io/hkamm123/pen/qEbVQXZ?editors=1010) is also a good example.

In order to avoid the lengthy syntax of promise chains, we can `await` the promise using a try/catch/finally block. `await` cannot be used unless in the top level or in an `async` function. The difference between using chains and using await is shown in the following code from the instruction:
``` js
const httpPromise = fetch('https://simon.cs260.click/api/user/me');
const jsonPromise = httpPromise.then((r) => r.json());
jsonPromise.then((j) => console.log(j));
console.log('done');

// OUTPUT: done
// OUTPUT: {email: 'bud@mail.com', authenticated: true}

const httpResponse = await fetch('https://simon.cs260.click/api/user/me');
const jsonResponse = await httpResponse.json();
console.log(jsonResponse);
console.log('done');

// OUTPUT: {email: 'bud@mail.com', authenticated: true}
// OUTPUT: done
```

## Midterm Study-Guide

### In the following code, what does the link element do?
	a link element links another file, such as a stylesheet or script
### In the following code,  what does a div tag do?
	a div tag can act as a separator or container for content separation or styling purposes
### In the following code, what is the difference between the #title and .grid selector?
	#title selects an element with id title, while .grid selects all elements with class grid
### In the following code, what is the difference between padding and margin?
	padding is on the inside of the border; margin on the outside
### Given this HTML and this CSS how will the images be displayed using flex?
	flex displays in a row by default, can change with things like flex-direction, align-items, and justify-content
### What does the following padding CSS do?
	modifies space inside the element (between the content and the border)
### What does the following code using arrow syntax function declaration do?
	just a first-class function
### What does the following code using map with an array output?
	map will apply a function to every item of an array, returning a new array without mutating the original
### What does the following code output using getElementByID and addEventListener?
	const btn = document.getElementById('btn');
	btn.addEventListener('click', () => console.log('Clicked!'));
### What does the following line of Javascript do using a # selector?
	matches # selector in css
### Which of the following are true? (mark all that are true about the DOM)
	The DOM represents the HTML document as a tree of objects. You can use JavaScript to access and modify
	DOM elements. Each HTML element is a node in the DOM.
### By default, the HTML span element has a default CSS display property value of: 
	inline
### How would you use CSS to change all the div elements to have a background color of red?
	div {background-color: red}
### How would you display an image with a hyperlink in HTML?
	wrap the <img> tag inside an <a> tag
### In the CSS box model, what is the ordering of the box layers starting at the inside and working out?
	content, padding, border, margin
### Given the following HTML, what CSS would you use to set the text "trouble" to green and leave the "double" text unaffected?
	div for all div elements; . for class; # for id;	
### How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?
	document.getElementById('byu').style.color = 'green';
### What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?
	<p> <ol> <ul> <h2> <h1> <h3>
### How do you declare the document type to be html?
	<!DOCTYPE html>
### What is valid javascript syntax for if, else, for, while, switch statements?
	same as Java but with things like let instead of type declarations
### What is the correct syntax for creating a javascript object?
	let myObj = {prop: val};
### Is it possible to add new properties to javascript objects?
	yes; object.newprop = val;
### If you want to include JavaScript on an HTML page, which tag do you use?
	<script src="./scripts.js">
### Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?
	document.getElementById('animal').textContent = 'crow';
### Which of the following correctly describes JSON?
	JSON (JavaScript Object Notation) is a way to represent JavaScript objects as strings
### What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo  do?
	ps: process status (list of processes); wget: get content from web servers
### Which of the following console command creates a remote shell session?
	ssh, using -i to input a key if needed, and using a username and domain name to specify where you're connecting to
### Which of the following is true when the -la parameter is specified for the ls console command?
	-l: long list format; -a: display all, including hidden
### Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?
	top-level: .click; root: bozo.click; sub: fruit.bozo.click, and banana.fruit.bozo.click;
### Is a web certificate is necessary to use HTTPS.
	yes; a web certificate is necessary
### Can a DNS A record can point to an IP address or another A record.
	no; an A record only points to an IP address
### Port 443, 80, 22 is reserved for which protocol?
	443: https; 80: http; 22: ssh;
### What will the following code using Promises output when executed?
	1 Promise.resolve('Done').then(console.log) -> 'Done'
	2 Promise.reject('Error').catch(console.error) -> 'Error'
	3 new Promise(res => setTimeout(() => res('Hi'),1000)).then(console.log) -> 'Hi' after 1s
	4 Async function returns value -> printed when awaited or .then
	5 Promise chain: Promise.resolve(2).then(x=>x*2).then(x=>x+1).then(console.log) -> 5
	6 Reject handled -> shows error via catch.