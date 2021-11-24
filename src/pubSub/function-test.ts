import { createSubscribable } from "./Subscribable-function";

const sub = createSubscribable<string>();

const unSub = sub.subscribe(console.log);

sub.publish("hello");
sub.publish("hello2");
unSub();
sub.publish("hello3");
