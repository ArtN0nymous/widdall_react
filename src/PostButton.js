import AnimatedLottieView from "lottie-react-native";
import { useRef,useEffect,useState } from "react";
import { View,Text,ImageBackground,TouchableOpacity } from "react-native";
import { Audio } from 'expo-av';
import firebase from "./database/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';
import Styles from "./Styles";
export default function PostButton({star,stars,id}){
    const db = firebase.db;
    var localstorage = new Storage ({
        size:1000,
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache:false,
    });
    global.localStorage = localstorage;
    const styles=Styles.styles;
    const animStar = require('./assets/lottie/star-burst.json');
    const animation= useRef(null);
    const [sound, setSound] = useState();
    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
           require('./assets/sounds/sound3.mp3')
        );
        setSound(sound);
    
        console.log('Playing Sound');
        await sound.playAsync(); 
    }
    useEffect(() => {
        return sound
          ? () => {
              console.log('Unloading Sound');
              sound.unloadAsync(); }
          : undefined;
    }, [sound]);
    useEffect(()=>{
        if(star){
            animation.current.play(0,45);
        }else{
            animation.current.play(18,0);
        }
    },[star]);
    /*Firebasde functions */
    const _star=async(id)=>{
        // animation.current.play(0,45);
        localstorage.load({
            key:'loginState'
        }).then((result)=>{
            let uid=result.userKey;
            db.collection('post').doc(id).get().then((doc)=>{
                let stars = doc.data().stars;
                let users_star=doc.data().users_star;
                let existe = false;
                if(users_star!=null&&users_star!=''){
                    var array=users_star.split(',');
                    for(var i in array){
                        if(array[i]==uid){
                            existe = true;
                        }
                    }
                    if(existe!=true){
                        users_star+=','+uid;
                    }
                }else{
                    users_star=uid;
                }
                stars = users_star.split(',').length;
                console.log(stars);
                if(existe!=true){
                    db.collection('post').doc(id).update({
                        stars:stars,
                        users_star:users_star
                    }).then((result)=>{
                        console.log('Starseaste una publicación');
                        playSound();
                    }).catch((error)=>{
                        console.log(error.code+' '+error.message);
                    });
                }
            }).catch((error)=>{
                console.log(error.code+' '+error.message);
            });
        }).catch((error)=>{
            console.log(error);
        });
    }
    const unStar=async(id)=>{
        // animation.current.play(18,0);
        localstorage.load({
            key:'loginState'
        }).then((result)=>{
            let uid=result.userKey;
            db.collection('post').doc(id).get().then((doc)=>{
                let stars = doc.data().stars;
                let users_star=doc.data().users_star;
                let existe = true;
                if(users_star!=null){}
                    users_star=users_star.split(',');
                    for(var i in users_star){
                        if(users_star[i]==uid){
                            users_star.splice(i,1);
                            existe=false;
                        }
                }
                stars=users_star.length;
                console.log(stars);
                if(existe!=true){
                    db.collection('post').doc(id).update({
                        stars:stars,
                        users_star:users_star.join()
                    }).then((result)=>{
                        console.log('Le quitaste una estrella a una publicación');
                    }).catch((error)=>{
                        console.log(error.code+' '+error.message);
                    });
                }
            }).catch((error)=>{
                console.log(error.code+' '+error.message);
            });
        }).catch((error)=>{
            console.log(error);
        });
    }
    /**firebase end */
    if(star){
        return(
            <TouchableOpacity activeOpacity={0.2} onPress={()=>unStar(id)}>
                <View style={styles.button_menu_container}>
                    <Text style={{position:'absolute', zIndex:3,color:'black'}}>{stars}</Text>
                    <AnimatedLottieView ref={animation} source={animStar} style={styles.lottie} autoPlay={false} loop={false}/>
                </View>
            </TouchableOpacity>
        )
    }else{
        return(
            <TouchableOpacity activeOpacity={0.2} onPress={()=>_star(id)}>
                <View style={styles.button_menu_container}>
                    <Text style={{position:'absolute', zIndex:3,color:'black'}}>{stars}</Text>
                    <AnimatedLottieView ref={animation} source={animStar} style={styles.lottie} autoPlay={false} loop={false}/>
                </View>
            </TouchableOpacity>
        )
    }
}