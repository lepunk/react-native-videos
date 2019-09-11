import React, { Component } from "react";
import { View, Image } from "react-native";
import Images from "./assets/Images";

export default class Floor extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;

        const imageIterations = Math.ceil(width / height);

        return (
            <View
                style={{
                    position: 'absolute',
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                    backgroundColor: this.props.color,
                    overflow: 'hidden',
                    flexDirection: 'row'
                }}>
                {Array.apply(null, Array(imageIterations)).map((el) => {
                    return <Image style={{ width: height, height: height }} source={Images.floor} resizeMode="stretch" />
                })}
            </View>
    );
  }
}
