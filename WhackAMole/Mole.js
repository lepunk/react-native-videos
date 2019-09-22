import React, { Component } from 'react';
import { View, StyleSheet, Button, Image, TouchableWithoutFeedback } from 'react-native';
import Images from './assets/Images';
import SpriteSheet from 'rn-sprite-sheet';
import Constants from './Constants';

export default class Mole extends Component {
    constructor(props){
        super(props);

        this.mole = null;
        this.actionTimeout = null;
        this.isPopping = false;
        this.isFeisty = false;
        this.isHealing = false;
        this.isWhacked = false;
        this.isAttacking = false;
    }

    pop = () => {
        this.isWhacked = false;
        this.isAttacking = false;
        this.isPopping = true;

        this.isFeisty = Math.random() < 0.4;
        if (!this.isFeisty){
            this.isHealing = Math.random() < 0.05;
        }

        if (this.isHealing){
            this.mole.play({
                type: "heal",
                fps: 24,
                onFinish: () => {
                    this.actionTimeout = setTimeout(() => {
                        this.mole.play({
                            type: "hide",
                            fps: 24,
                            onFinish: () => {
                                this.isPopping = false;
                                this.props.onFinishPopping(this.props.index);
                            }
                        })
                    }, 1000);
                }
            })
        } else {
            this.mole.play({
                type: "appear",
                fps: 24,
                onFinish: () => {
                    if (this.isFeisty){
                        this.actionTimeout = setTimeout(() => {
                            this.isAttacking = true;
                            this.props.onDamage();
                            this.mole.play({
                                type: "attack",
                                fps: 12,
                                onFinish: () => {
                                    this.mole.play({
                                        type: "hide",
                                        fps: 24,
                                        onFinish: () => {
                                            this.isPopping = false;
                                            this.props.onFinishPopping(this.props.index);
                                        }
                                    })
                                }
                            })
                        }, 1000)
                    } else {
                        this.actionTimeout = setTimeout(() => {
                            this.mole.play({
                                type: "hide",
                                fps: 24,
                                onFinish: () => {
                                    this.isPopping = false;
                                    this.props.onFinishPopping(this.props.index);
                                }
                            })
                        }, 1000)
                    }
                }
            })
        }
    }

    whack = () => {
        if (!this.isPopping || this.isWhacked || this.isAttacking){
            return;
        }

        if (this.actionTimeout){
            clearTimeout(this.actionTimeout);
        }

        this.isWhacked = true;
        this.isFeisty = false;

        this.props.onScore();
        if (this.isHealing){
            this.props.onHeal();
        }

        this.mole.play({
            type: "dizzy",
            fps: 24,
            onFinish: () => {
                this.mole.play({
                    type: "faint",
                    fps: 24,
                    onFinish: () => {
                        this.isPopping = false;
                        this.props.onFinishPopping(this.props.index);
                    }
                })
            }
        })
    }

    render(){
        return (
            <View style={{ flex: 1 }}>
                <SpriteSheet
                    ref={ref => (this.mole = ref)}
                    source={Images.sprites}
                    columns={6}
                    rows={8}
                    // height={200} // set either, none, but not both
                    // width={200}
                    //width={100}
                    width={100}
                    animations={{
                        idle: [0],
                        appear: [1, 2, 3, 4],
                        hide: [4, 3, 2, 1, 0],
                        dizzy: [36, 37, 38],
                        faint: [42, 43, 44, 0],
                        attack: [11, 12, 13, 14, 15, 16],
                        heal: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33]
                    }}
                />
                <TouchableWithoutFeedback onPress={this.whack} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
                </TouchableWithoutFeedback>
            </View>
        )
    }
}
