import React, {Component} from 'react';
import { Dimensions, View, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { transformOrigin } from "react-native-redash";

const { interpolate } = Animated;
const { width, height } = Dimensions.get("window");
const W = width;
const H = W;
const innerR = (W / 2) - 50;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rotaryContainer: {
        width: W,
        height: H,
        backgroundColor: 'red',
        borderRadius: W / 2
    }
});

export default class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const index = new Animated.Value(0);
        const length = 10;
        const l = Math.sin(Math.PI / length);
        const r = (innerR * l) / (1 - l);
        const R = W;
        const cx = width / 2 - r;
        const cy = R - r;
        const segment = (2 * Math.PI) / length;
        const rotateZ = interpolate(index, {
            inputRange: [0, length],
            outputRange: [0, -2 * Math.PI]
        });

        return (
            <View style={styles.container}>
                <View style={styles.rotaryContainer}>

                </View>
                <Animated.View
                    style={{
                        ...StyleSheet.absoluteFillObject,
                    }}
                >
                {Array.apply(null, Array(length)).map((_, key) => {
                    return (
                        <View
                            {...{ key }}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                transform: [
                                    { translateX: cx },
                                    { translateY: cy },
                                    { rotateZ: `${key * segment}rad` },
                                    { translateY: -cy }
                                ],
                            }}
                        >
                            <View style={{ width: r * 2, height: r * 2, borderRadius: r, backgroundColor: 'blue'}}>

                            </View>
                        </View>
                    );
                })}
                </Animated.View>
            </View>
        )
    }
}
