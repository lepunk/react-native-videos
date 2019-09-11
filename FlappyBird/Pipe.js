import React, { Component } from "react";
import { View, Image } from "react-native";
import Images from "./assets/Images";

export default class Pipe extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;

        const pipeRatio = 160 / width; // 160 is the original image size
        const pipeHeight = 33 * pipeRatio;
        const pipeIterations = Math.ceil(height / pipeHeight);

        return (
            <View
                style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                    backgroundColor: this.props.color,
                    overflow: 'hidden',
                    flexDirection: 'column'
                }}>
                {Array.apply(null, Array(pipeIterations)).map((el) => {
                    return <Image style={{ width: width, height: pipeHeight }} source={Images.pipeCore} resizeMode="stretch" />
                })}
            </View>
    );
  }
}
