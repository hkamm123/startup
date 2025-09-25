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

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

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
