import React, { Component } from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';
import Images from './assets/Images';
import SpriteSheet from 'rn-sprite-sheet';
import Constants from './Constants';
import Mole from './Mole';

export default class App extends Component {
    constructor(props){
        super(props);
        this.moles = [];
        this.molesPopping = 0;

        this.interval = setInterval(this.popRandomMole, 350);
    }

    randomBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    onFinishPopping = (index) => {
        this.molesPopping -= 1;
    }

    popRandomMole = () => {
        if (this.moles.length != 12){
            console.log(this.moles.length);
            return;
        }

        let randomIndex = this.randomBetween(0, 11);
        if (!this.moles[randomIndex].isPopping && this.molesPopping < 3){
            this.molesPopping += 1;
            this.moles[randomIndex].pop();
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <Image style={styles.backgroundImage} resizeMode="stretch" source={Images.background} />
                <View style={styles.playArea}>
                    {Array.apply(null, Array(4)).map((el, rowIdx) => {
                        return (
                            <View style={styles.playRow} key={rowIdx}>
                                {Array.apply(null, Array(3)).map((el, colIdx) => {
                                    let moleIdx = (rowIdx * 3) + colIdx;

                                    return (
                                        <View style={styles.playCell} key={colIdx}>
                                            <Mole index={moleIdx} ref={(ref) => { this.moles[moleIdx] = ref }} onFinishPopping={this.onFinishPopping} />
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
