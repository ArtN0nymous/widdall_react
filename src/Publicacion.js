import { View,Text,ImageBackground,TouchableOpacity } from "react-native";
import { FontAwesome5,AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Styles from "./Styles";
import firebase from "./database/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';
import AnimatedLottieView from "lottie-react-native";
import { useRef,useEffect,useState } from "react";
export default function Publicacione({post,profile,descrip,img,fecha,stars,star}){
    const db = firebase.db;
    var localstorage = new Storage ({
        size:1000,
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache:false,
    });
    const animStar = require('./assets/lottie/star-burst.json');
    const gold ={backgroundColor:'rgba(220,197,4,0.2)'};
    const skyblue={backgroundColor:'rgba(5,155,197,0.5)'};
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
    },[star])
    /*Firebasde functions */
    const _star=async(id)=>{
        localstorage.load({
            key:'loginState'
        }).then((result)=>{
            let uid=result.userKey;
            db.collection('post').doc(id).get().then((doc)=>{
                let stars = doc.data().stars;
                let users_star=doc.data().users_star;
                stars+=1;
                if(users_star!=null){
                    users_star+=','+uid;
                }else{
                    users_star=uid;
                }
                db.collection('post').doc(id).update({
                    stars:stars,
                    users_star:users_star
                }).then((result)=>{
                    console.log('Starseaste una publicación');
                    playSound();
                }).catch((error)=>{
                    console.log(error.code+' '+error.message);
                });
            }).catch((error)=>{
                console.log(error.code+' '+error.message);
            });
        }).catch((error)=>{
            console.log(error);
        });
    }
    const unStar=async(id)=>{
        localstorage.load({
            key:'loginState'
        }).then((result)=>{
            let uid=result.userKey;
            db.collection('post').doc(id).get().then((doc)=>{
                let stars = doc.data().stars;
                let users_star=doc.data().users_star;
                stars-=1;
                console.log(stars);
                if(users_star!=null){}
                    users_star=users_star.split(',');
                    for(var i in users_star){
                        if(users_star[i]==uid){
                            users_star.splice(i,1);
                        }
                }
                db.collection('post').doc(id).update({
                    stars:stars,
                    users_star:users_star.join()
                }).then((result)=>{
                    console.log('Le quitaste una estrella a una publicación');
                }).catch((error)=>{
                    console.log(error.code+' '+error.message);
                });
            }).catch((error)=>{
                console.log(error.code+' '+error.message);
            });
        }).catch((error)=>{
            console.log(error);
        });
    }
    /**firebase end */
    global.localStorage = localstorage;
    const styles=Styles.styles;
    let date = new Date(fecha);
    let fulltime = date.toLocaleDateString();
    if(star!=false){
        return(
            <View style={styles.tarjeta_public_cont}>
                <View style={styles.header_public}>
                    <View style={styles.contenedor_profile_public}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <ImageBackground style={styles.image_profile_public} source={{uri:profile.url_photo}}/>
                            <Text style={styles.text_name_profile_public}>{profile.displayName}</Text>
                        </View>
                    </View>
                    <Text style={{alignSelf:'flex-end'}}>{fulltime}</Text>
                </View>
                <Text style={styles.descrip_public}>{descrip}</Text>
                <ImageBackground style={styles.image_public} source={{uri:img}}/>
                <View style={styles.footer_public}>
                    <View style={[styles.contenedor_boton_menu,styles.footer_buttons,gold]}>
                        <TouchableOpacity activeOpacity={0.2} onPress={()=>unStar(post)}>
                            <View style={styles.button_menu_container}>
                                <Text style={{position:'absolute', zIndex:3}}>{stars}</Text>
                                {/* <AntDesign name="star" size={35} color="gold" /> */}
                                <AnimatedLottieView ref={animation} source={animStar} style={styles.lottie} autoPlay={false} loop={false}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.contenedor_boton_menu,styles.footer_buttons,skyblue]}>
                        <TouchableOpacity activeOpacity={0.6}>
                            <View style={styles.button_menu_container}>
                                <FontAwesome5 name="share" size={35} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }else{
        return(
            <View style={styles.tarjeta_public_cont}>
                <View style={styles.header_public}>
                    <View style={styles.contenedor_profile_public}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <ImageBackground style={styles.image_profile_public} source={{uri:profile.url_photo}}/>
                            <Text style={styles.text_name_profile_public}>{profile.displayName}</Text>
                        </View>
                    </View>
                    <Text style={{alignSelf:'flex-end'}}>{fulltime}</Text>
                </View>
                <Text style={styles.descrip_public}>{descrip}</Text>
                <ImageBackground style={styles.image_public} source={{uri:img}}/>
                <View style={styles.footer_public}>
                    <View style={[styles.contenedor_boton_menu,styles.footer_buttons]}>
                        <TouchableOpacity activeOpacity={0.2} onPress={()=>_star(post)}>
                            <View style={styles.button_menu_container}>
                                <Text style={{position:'absolute', zIndex:3}}>{stars}</Text>
                                {/* <AntDesign name="star" size={35} color="white" /> */}
                                <AnimatedLottieView ref={animation} source={animStar} style={styles.lottie} autoPlay={false} loop={false}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.contenedor_boton_menu,styles.footer_buttons,skyblue]}>
                        <TouchableOpacity activeOpacity={0.6}>
                            <View style={styles.button_menu_container}>
                                <FontAwesome5 name="share" size={35} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}