import React, { Component } from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';
import Images from './assets/Images';
import SpriteSheet from 'rn-sprite-sheet';
import Constants from './Constants';
import Mole from './Mole';

export default class App extends Component {
    constructor(props){
        super(props);

        this.mole = null;
    }

    render(){
        return (
            <View style={styles.container}>
                <Image style={styles.backgroundImage} resizeMode="stretch" source={Images.background} />
                <View style={styles.playArea}>
                    {Array.apply(null, Array(4)).map((el, idx) => {
                        return (
                            <View style={styles.playRow} key={idx}>
                                {Array.apply(null, Array(3)).map((el, idx) => {
                                    return (
                                        <View style={styles.playCell} key={idx}>
                                            <Mole />
                                        </View>
                                    )
                                })}
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    backgroundImage: {
        width: Constants.MAX_WIDTH,
        height: Constants.MAX_HEIGHT,
        position: 'absolute'
    },
    playArea: {
        width: Constants.MAX_WIDTH,
        marginTop: Constants.YR * 250,
        height: Constants.MAX_HEIGHT - Constants.YR * 250 - Constants.YR * 112,
        flexDirection: 'column',
    },
    playRow: {
        height: (Constants.MAX_HEIGHT - Constants.YR * 250 - Constants.YR * 112) / 4,
        width: Constants.MAX_WIDTH,
        flexDirection: 'row',
    },
    playCell: {
        width: Constants.MAX_WIDTH / 3,
        height: (Constants.MAX_HEIGHT - Constants.YR * 250 - Constants.YR * 112) / 4,
        alignItems: 'center'
    }
});
