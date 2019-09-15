import React, { Component } from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';
import Images from './assets/Images';
import SpriteSheet from 'rn-sprite-sheet';
import Constants from './Constants';

export default class App extends Component {
    constructor(props){
        super(props);

        this.mole = null;
    }

    render(){
        return (
            <View style={styles.container}>
                <Image style={styles.backgroundImage} resizeMode="stretch" source={Images.background} />
                <SpriteSheet
                    ref={ref => (this.mole = ref)}
                    source={Images.sprites}
                    columns={4}
                    rows={4}
                    // height={200} // set either, none, but not both
                    // width={200}
                    //width={100}
                    width={100}
                    animations={{
                        idle: [0],
                        appear: [4, 5, 6, 7],
                        hide: [7, 6, 5, 4, 0],
                    }}
                />
                <Button title="press me" onPress={() => { this.mole.play({
                    type: "appear",
                    fps: 12,
                    onFinish: () => {
                        setTimeout(() => { this.mole.play({ type: "hide", fps: 12 }) }, 500);
                    }
                })}} />
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    backgroundImage: {
        width: Constants.MAX_WIDTH,
        height: Constants.MAX_HEIGHT,
        position: 'absolute'
    }
});
