import Matter from "matter-js";

let tick = 0;
let pose = 1;

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
