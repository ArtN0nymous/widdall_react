import { View, TouchableOpacity,Modal,TextInput,Text,ImageBackground,RefreshControl, Alert,ActivityIndicator,FlatList } from "react-native";
import { useState, useEffect,useRef,useCallback } from "react";
import Styles from "./Styles";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "./database/firebase";
import { Entypo, FontAwesome5,Ionicons,MaterialIcons,FontAwesome} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';
import * as ImagePicker from 'expo-image-picker';
import Gallery from 'react-native-image-gallery';
import PostButton from "./PostButton";
export default function Publicaciones({navigation}){
    const styles = Styles.styles;
    const db=firebase.db;
    const storage = firebase.firebase.storage();
    const auth = firebase.auth;
    var localstorage = new Storage ({
        size:1000,
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache:false,
    });
    global.localStorage = localstorage;
    const [state,setState]=useState({
        menu_display:{display:'none'},
        newPost_display:false,
        open_display:{display:'none'},
        display_gallery:{display:'none'},
        path:'',
        descripcion:'',
        img:'',
        img_gallery:'',
        cargando:{display:'none'},
        post:[],
        user:''
    });
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        localstorage.load({
            key:'loginState'
        }).then((result)=>{
            leerPublic(result.userKey).then(() => setRefreshing(false));
        }).catch((error)=>{
            console.log(error);
        });
      }, []);
    function toggle_menu(){
        if(state.menu_display.display=='none'){
            setState({...state,menu_display:{display:'flex'}})
        }else{
            setState({...state,menu_display:{display:'none'}})
        }
    }
    const [post,setPost]=useState([]);
    const handleChangeText = (name,value)=>{
        setState({...state,[name]:value})
    }
    function cancelar(){
        setState({...state,newPost_display:false,path:'',img:{uri:''}});
    }
    function cancel(){
        setState({...state,open_display:{display:'none'}})
    }
    const dimiss=()=>{
        setState({...state,display_gallery:{display:'none'}});
    }
    useEffect(()=>{
        let abortController = new AbortController();
        loadProfile();
        return function cleanup(){
            abortController.abort();
        }
    },[]);
    const loadProfile=()=>{
        localstorage.load({
            key:'loginState'
        }).then((result)=>{
            setState({...state,user:result.userKey});
            if(result.verified!=true){
                Alert.alert('Atención','Debes verificar tu usuario, enviamos un correo electrónico a la dirección: ⭐ '+auth.currentUser.email+' ⭐');
                navigation.navigate('Login');
            }
            leerPublic(result.userKey);
        }).catch((error)=>{
            Alert.alert('Atención','Debes iniciar sesión',[{
                text:'Ok',
                onPress:()=>{navigation.navigate('Login');}
            }]);
        });
    }
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        let options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowEditing:true,
            aspect:[4,3],
            quality:0.8
        }
        if (permissionResult.granted === false) {
            cancel();
          alert("Permission to access camera roll is required!");
          return;
        }else{
            let pickerResult = await ImagePicker.launchImageLibraryAsync();
            if(pickerResult.cancelled==true){
                return;
            }else{
                setState({...state,img:{uri:pickerResult.uri},path:pickerResult.uri, open_display:{display:'none'}});
            }
        }
    }
    let openCamera = async ()=>{
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        let options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowEditing:true,
            aspect:[4,3],
            quality:0.8,
            saveToPhotos:true
        }
        if(permissionResult.granted === false){
            cancel();
            alert('Permisos para usar la cámara requeridos !');
            return;
        }else{
            let pickerResult = await ImagePicker.launchCameraAsync(options);
            if(pickerResult.cancelled==true){
                return;
            }else{
                setState({...state,img:{uri:pickerResult.uri},path:pickerResult.uri, open_display:{display:'none'}});
            }
        }
    }
    const data =[{usuario:'Usuario',url_photo:'',descripcion:'Hola :3',img:''},{usuario:'Usuario',url_photo:'',descripcion:'El oeste de Texas divide la frontera entre S',img:''}]
    function checarDatos(){
        if(state.path!=''||state.descripcion!=''){
            if(state.path!=''){
                setState({...state,cargando:{display:'flex'}});
                saveImg(state.path);
            }else{
                publicar(state.descripcion,'');
            }
        }else{
            Alert.alert('Ups!','Parece que no puedes hacer una publicación vacía 👀');
        }
    }
    function validImage(){
        let path = state.path;
        if(path!=''){
            setState({...state,display_gallery:{display:'flex'},img_gallery:path});
        }
    }
    /*FUNCIONES FIREBASE */
    const publicar = async(desc,url)=>{
        localstorage.load({
            key:'loginState'
        }).then((result)=>{
            let uid = result.userKey;
            db.collection('post').add({
                user:uid,
                fecha:Date.now(),
                img:url,
                stars:0,
                users_star:null,
                descripcion:desc
            }).then((result)=>{
                setState({...state,newPost_display:false,path:'',user:uid,img:{uri:''}});
                leerPublic(uid);
            }).catch((error)=>{
                console.log(error.code+' '+error.message);
            });
        }).catch((error)=>{
            console.log('Error al cargar el usuario');
        });
    }
    const leerPublic=async(user=state.user)=>{
        db.collection('post').onSnapshot((snapshot)=>{
            if(state.user!=''){
                user=state.user;
            }
            if(user!=''){
                db.collection('users').doc(user).get().then((doc)=>{
                    let following=doc.data().following;
                    try{
                        if(following!=''){
                            following=following.split(',');
                            let array = [];
                            db.collection('post').where('user','==',user).get().then((snapshot)=>{
                                snapshot.forEach((doc) => {
                                    let id = doc.id;
                                    let post = doc.data();
                                    post.id=id;
                                    array.push(post);
                                });
                                for(var i in following){
                                    db.collection('post').where('user','==',following[i]).get().then((snapshot)=>{
                                        snapshot.forEach((doc) => {
                                            let id_1 = doc.id;
                                            let post_1 = doc.data();
                                            post_1.id=id_1;
                                           array.push(post_1);
                                        });
                                    },(error)=>{
                                        console.log(error);
                                    });
                                }
                                db.collection('users').get().then((result)=>{
                                    result.forEach((doc) => {
                                        for(var i in array){
                                            if(doc.id==array[i].user){
                                                array[i].profile=doc.data();
                                                let users_star = array[i].users_star;
                                                array[i].star=false;                
                                                if(users_star!=null){
                                                    users_star=users_star.split(',');
                                                    for(var j in users_star){
                                                        if(users_star[j]==user){
                                                            array[i].star=true;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    });
                                    let newArray = array.sort((a, b) => new Date(a.fecha).getTime() < new Date(b.fecha).getTime());
                                    setPost(newArray);
                                }).catch((error)=>{
                                    console.log(error.code+' '+error.message);
                                });
                            },(error)=>{
                                console.log(error);
                            });
                        }
                    }catch(error){
                        console.log(error);
                    }
                }).catch((error)=>{ 
                    console.log(error.code+' '+error.message);
                }); 
            }     
        },(error)=>{
            console.log(error.code+' '+error.message);
        });
    }
    const saveImg = async (path)=>{
        if(path!=''){
            let file = await fetch(path).then(r => r.blob());
            let array = path.split('/');
            let name = array[array.length-1];
            let profile = {};
            let portada = require('./img/sebas.jpg');   
            await storage.ref('Perfiles').child('Imagenes/'+name).put(file).then( async function(snapshot){
                await snapshot.ref.getDownloadURL().then(function(imgurl){
                    var url = imgurl;
                    setState({...state,cargando:{display:'flex'}});
                    publicar(state.descripcion,url);
                });
            }).catch((error)=>{
                console.log(error.code+' '+error.message);
                setState({...state,cargando:{display:'none'}});
                alert("error: " + error.message);
            });
        }else{
            Alert.alert('Vaya','Parece que algo salio mal :/');
        }
    }
    const cerrarSesion=async()=>{
        await auth.signOut().then(()=>{
            localstorage.remove({
                key:'loginState'
            }).then((resul)=>{
                localstorage.remove({
                    key:'usuarios'
                }).then((result)=>{
                    navigation.navigate('Login');
                });
            }).catch((error)=>{
                console.log(error);
            });
        }).catch((error)=>{
            alert('Ha ocurrido un error al intentar cerrar la sesión.');
            console.log(error.code+' '+error.message);
        });
    }
    /*FIREBASE END */
    /*POST CONTROLS */
    const gold ={backgroundColor:'rgba(220,197,4,0.2)'};
    const skyblue={backgroundColor:'rgba(5,155,197,0.5)'};
    const [displayGallery,setDisplayGallery]=useState(false);
    const [img,setImg]=useState('');
    const postImg=(img)=>{
        if(displayGallery!=true){
            setImg(img);
            setDisplayGallery(true);
        }else{
            setDisplayGallery(false);
        }
    }
    const footer=(
        <></>
    );
    const header=(
        <></>
    );
    const numColumns=1;
    const formatData=(data,numColums)=>{
        const n_filas = Math.floor(data.length/numColums);

        let n_element_lastrow = data.length - (n_filas);
        
        return data;
    }
    /*POST END */
    const renderItem = ({item,index})=>{
        let date = new Date(item.fecha);
        let fulltime = date.toLocaleDateString();
        return(
            <View style={styles.tarjeta_public_cont}>
                <View style={styles.header_public}>
                    <View style={styles.contenedor_profile_public}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity activeOpacity={0.6}>
                                <ImageBackground style={styles.image_profile_public} source={{uri:item.profile.url_photo}}/>
                            </TouchableOpacity>
                            <Text style={styles.text_name_profile_public}>{item.profile.displayName}</Text>
                        </View>
                    </View>
                    <Text style={{alignSelf:'flex-end'}}>{fulltime}</Text>
                </View>
                <Text style={styles.descrip_public}>{item.descripcion}</Text>
                <TouchableOpacity activeOpacity={0.6} onPress={()=>postImg(item.img)}>
                    <ImageBackground style={styles.image_public} source={{uri:item.img}}/>
                </TouchableOpacity>
                <View style={styles.footer_public}>
                    <View style={[styles.contenedor_boton_menu,styles.footer_buttons,gold]}>
                        <PostButton star={item.star} stars={item.stars} id={item.id}/>
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
    return(
        <View style={styles.contenedor_publicaciones}>
            <View style={styles.contenedor_publicacion}>
                <FlatList refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>onRefresh()}/>} ListHeaderComponent={header} ListFooterComponent={footer} style={{flex:1, flexDirection:'column',backgroundColor:'#EEF1F3'}} data={formatData(post,numColumns)} renderItem={renderItem} numColumns={numColumns}/>
            </View>
            <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.contenedor_menu}>
                <View style={styles.contenedor_boton_menu}>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>toggle_menu()}>
                        <View style={styles.button_menu_container}>
                            <Entypo name="menu" size={35} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.menu_content,state.menu_display]}>
                    <View style={styles.contenedor_boton_menu}>
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>setState({...state,newPost_display:true})}>
                            <View style={styles.button_menu_container}>
                                <MaterialIcons name="add-box" size={35} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contenedor_boton_menu}>
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>navigation.navigate('Perfil')}>
                            <View style={styles.button_menu_container}>
                                <FontAwesome5 name="user-circle" size={35} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contenedor_boton_menu}>
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>navigation.navigate('Usuario')}>
                            <View style={styles.button_menu_container}>
                                <Ionicons name="people-circle" size={35} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contenedor_boton_menu}>
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>navigation.navigate('Chats')}>
                            <View style={styles.button_menu_container}>
                                <Ionicons name="md-chatbubbles" size={35} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contenedor_boton_menu}>
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>cerrarSesion()}>
                            <View style={styles.button_menu_container}>
                                <Ionicons name="ios-log-out" size={35} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
            <Modal animationType="fade" visible={state.newPost_display} transparent={true}>
                <View style={styles.newPost}>
                    <View style={styles.form_newpost}>
                        <View style={styles.header_newpost}>
                            <Text style={styles.texto_header_newpost}>Crear nueva publicación</Text>
                            <TextInput placeholder="Agrega una descripción...(opcional)" maxLength={50} style={styles.input_newpost} onChangeText={(value)=>handleChangeText('descripcion',value)}/>
                        </View>
                        <View style={styles.body_newpost}>
                            <View style={[styles.edit_portada,{zIndex:5}]}>
                                <TouchableOpacity onPress={()=>setState({...state,open_display:{display:'flex'}})}>
                                    <FontAwesome size={25} name='pencil-square-o' color='white'/>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.image_newpost} onPress={()=>validImage()}>
                                <ImageBackground style={styles.image_newpost} source={state.img}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.footer_newpost}>
                            <View style={[styles.contenedor_boton_menu,{flexDirection:'row'}]}>
                                <TouchableOpacity activeOpacity={0.6} onPress={()=>cancelar()}>
                                    <View style={styles.button_menu_container}>
                                        <FontAwesome name="close" size={35} color="pink" />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.6} onPress={()=>checarDatos()}>
                                    <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={[styles.login_btn_regist,{marginTop:0}]}>
                                        <Text style={styles.texts_regist}>Publicar</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.loading_contenedor,state.open_display,{zIndex:12}]}>
                    <View style={{ width:200,top:100, zIndex:10, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(255,255,255,0.2)', borderRadius:10}}>
                        <TouchableOpacity onPress={cancel}>
                            <View style={styles.btn_cancel_regist}>
                                <Text style={{color:'white', fontWeight:'bold'}}>X</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.6} onPress={openCamera}>
                            <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.open_btn_regist}>
                                <Text style={styles.texts_regist}>Cámara</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.6} onPress={openImagePickerAsync}>
                            <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.open_btn_regist}>
                                <Text style={styles.texts_regist}>Galería</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.loading_contenedor,state.display_gallery,{zIndex:12}]}>
                    <View style={{ flex:1, zIndex:10, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(255,255,255,0.2)', borderRadius:10}}>
                        <Gallery style={{flex:1,backgroundColor:'rgba(0,0,0,0.6)'}} images={[
                            {source:{uri:state.img_gallery}}
                        ]} onSingleTapConfirmed={()=>dimiss()}/>
                    </View>
                </View>
                <View style={[styles.loading_contenedor,state.cargando,{zIndex:13}]}>
                    <ActivityIndicator size={50} color='purple' animating={true} style={styles.loading}/>
                    <Text style={styles.loading_text}>Cargando</Text>
                </View>
            </Modal>
            <Modal visible={displayGallery} transparent={true}>
                <Gallery style={{flex:1,backgroundColor:'rgba(0,0,0,0.6)'}} images={[
                    {source:{uri:img}}
                ]} onSingleTapConfirmed={()=>postImg('')}/>
            </Modal>
        </View>
    );
}