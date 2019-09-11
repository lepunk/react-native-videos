import Matter from "matter-js";
import Constants from './Constants';
import Pipe from './Pipe';

let tick = 0;
let pose = 1;

export const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const generatePipes = () => {
    let topPipeHeight = randomBetween(100, (Constants.MAX_HEIGHT / 2) - 100);
    let bottomPipeHeight = Constants.MAX_HEIGHT - topPipeHeight - Constants.GAP_SIZE - 50;

    let sizes = [topPipeHeight, bottomPipeHeight]

    if (Math.random() < 0.5) {
        sizes = sizes.reverse();
    }


    return sizes;
}

const Physics = (entities, { touches, time }) => {
    let engine = entities.physics.engine;
    let world = entities.physics.world;
    let bird = entities.bird.body;

    let hadTouches = false;
    touches.filter(t => t.type === "press").forEach(t => {
        if (!hadTouches){
            if (world.gravity.y === 0.0){
                // first press really
                world.gravity.y = 1.2;
                
                let [pipe1Height, pipe2Height] = generatePipes();

                let pipe1 = Matter.Bodies.rectangle( Constants.MAX_WIDTH - (Constants.PIPE_WIDTH / 2), pipe1Height / 2, Constants.PIPE_WIDTH, pipe1Height, { isStatic: true });
                let pipe2 = Matter.Bodies.rectangle( Constants.MAX_WIDTH - (Constants.PIPE_WIDTH / 2), Constants.MAX_HEIGHT - (pipe2Height / 2) - 50, Constants.PIPE_WIDTH, pipe2Height, { isStatic: true });

                Matter.World.add(world, [pipe1, pipe2]);

                entities["pipe1"] = {
                    body: pipe1, size: [Constants.PIPE_WIDTH, pipe1Height], color: "green", renderer: Pipe
                }

                entities["pipe2"] = {
                    body: pipe2, size: [Constants.PIPE_WIDTH, pipe2Height], color: "green", renderer: Pipe
                }
            }
            hadTouches = true;
            //Matter.Body.applyForce( bird, bird.position, {x: 0.00, y: -0.05});
            Matter.Body.setVelocity(bird, {
              x: bird.velocity.x,
              y: -10
            });
        }
    });

    Object.keys(entities).forEach(key => {
        if (key.indexOf("pipe") === 0){
            if (entities[key].body.position.x <= -1 * (Constants.PIPE_WIDTH / 2)){
                Matter.Body.setPosition( entities[key].body, {x: Constants.MAX_WIDTH * 2 - (Constants.PIPE_WIDTH / 2), y: entities[key].body.position.y});
            } else {
                Matter.Body.translate( entities[key].body, {x: -1, y: 0});
            }
        } else if (key.indexOf("floor") === 0){
            if (entities[key].body.position.x <= -1 * (Constants.MAX_WIDTH / 2)){
                Matter.Body.setPosition( entities[key].body, {x: Constants.MAX_WIDTH + (Constants.MAX_WIDTH / 2), y: entities[key].body.position.y});
            } else {
                Matter.Body.translate( entities[key].body, {x: -1, y: 0});
            }
        }
    });

    Matter.Engine.update(engine, time.delta);

    tick += 1;
    if (tick % 5 === 0){
        pose = pose + 1;
        if (pose > 3){
            pose = 1;
        }
        entities.bird.pose = pose;
    }

    return entities;
};

export default Physics;
