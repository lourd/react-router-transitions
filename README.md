# [React Router Transitions Demo](https://lourd.github.io/react-router-transitions/)
This is a small toy app demonstrating how to animate transitioning between routes with [React Router (v4+)](https://reacttraining.com/react-router/).

Understanding the nuance of animating route transitions when using an array of route objects, the `Switch` component, and positioning the pages is very tricky. I was motivated to make this after misunderstanding it myself several times during projects, and after observing all of the confusion in [react-router#4351](https://github.com/ReactTraining/react-router/issues/4351).

The meat of the code is in [`src/App.js`](https://github.com/lourd/react-router-transitions/blob/master/src/App.js).

## Usage
First install Git and Node.js

```sh
git clone https://github.com/lourd/react-router-transitions
cd react-router-transitions
npm install
npm start
```

## FAQ
### Why do you need to use the `withRouter` decorator?
By using the `withRouter` decorator/function/higher-order component, the `App` component receives the `location` as a prop. That's then passed down a prop to the `Switch` component, which in turn passes it down to each of the child `Routes` to use for computing whether it's matched or not. Passing `location` as a prop to `Switch` or `Route` overrides their default behavior of getting the `location` from `context`. We need to do this so that the exiting `Switch` and `Route` components keep the "old" location, instead of getting the new one.

### I don't get it, how does the `Switch` component keep its old `location`?
When going to a new route, getting a new history `location`, the `App` component renders a new `Switch` element. It's "new" because it has a different `key`. The "old" `Switch` has the same `key` and `location` as it did before, so it will render the same `Route` from before the route switch while its exit transition occurs.

### Why are you using `location.pathname` instead of `location.key` as the `key` for the `Switch` component?

That's because when clicking on a link for the same route, it generates a new history `location`. We don't want to have 2 copies of the page for the one path, which is what happens when using `location.key` (try it out and see!). So we use the `pathname` instead, which guarantees that there can't be 2 components rendered for one path.
