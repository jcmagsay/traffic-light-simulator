# Traffic Light Simulator

Within this app, there is a simulation for how a traffic light works.

## Design Language

Atomic design in the design language of choice and components are broken into the following categories:
- atoms
- molecules
- ecosystems
- etc.

Read more on Atomic Deisgn [HERE](https://bradfrost.com/blog/post/atomic-web-design/)

## Instructions

By running the app, you will be provided with instructions that inform an individual how to interact with the simulator

## Types of State Machines

### Non-Deterministic

Chooses next light at random without using the current or next state.

### Deterministic

Chooses next light based on the sequence `R -> G -> Y -> (repeat)`.


## Outstanding Feature Work

- `TODO` clean up - there are many TODOs that need addressing
- Migrate `styles.scss` styles to relevant files when their respective components are created.
- Unit tests - there was no testing package, so much error handling was created in order to handle error states and null data states. Unit tests will help address unknowns in the future
- Traffic Sequence Flexibility - Make the traffic light more flexible for different sequencing and different colors schemes.
- Debounce events - Creating a debounce event that prevents user from making too many requests. We could also disable the button state until data or the next state is retrieved.
