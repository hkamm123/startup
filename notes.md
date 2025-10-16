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

I learned what it means to "push state up" in React, which gives me the ability to pass variables and objects between components.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
