'use client'
import {Box, Button, Modal, Stack, TextField, Typography} from "@mui/material";
import { useState, useEffect} from "react";
import {firestore} from '@/firebase'
import { collection, deleteDoc, getDocs, query, getDoc, doc, setDoc } from "firebase/firestore";

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
      pantryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setPantry(pantryList)

  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data();
      await setDoc(docRef, {quantity: quantity + 1})
    } else {
      await setDoc(docRef, {quantity: 1})
    }

    await updatePantry();
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      if(quantity === 1){
        await deleteDoc(docRef)
      }
      else{
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }

    await updatePantry();
  }

  useEffect(()=> {
    updatePantry()
  }, [])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <Box width="100vw"
         height="100vh"
         display={'flex'}
         justifyContent={'center'}
         alignItems={'center'}
         flexDirection='column'
         gap ={2}>
      <Modal
        open={open}
        onClose={handleClose}>
          <Box
            position={"absolute"}
            top= "50%"
            left="50%"
            transform="translate(-50%, 50%)"
            width={400}
            bgcolor="white"
            border='3px solid black'
            boxShadow={24}
            p={4}
            display={'flex'}
            flexDirection={'column'}
            gap={3}
            sx={{
              transform:'translate(-50%, 50)'
            }}>
              <Typography variant="h6">Add Item</Typography>
              <Stack width={"100%"} direction={"column"} spacing={2}>
                <TextField 
                  variant="outlined"
                  fullWidth
                  value={itemName}
                  label="Outlined"
                  onChange={(e)=>{
                    setItemName(e.target.value)
                  }}/>Item Name
                <Button variant="contained"
                onClick={()=>{
                  addItem(itemName)
                  setItemName('')
                  handleClose()
                }}>Add</Button>

              </Stack>
            </Box>
        </Modal>
        <Typography variant="h1" display={'flex'} alignItems={'center'} justifyContent={'center'} margin={'5px'}>Pantry Tracker</Typography>
      <Button variant="contained" onClick={() => {
        handleOpen()
      }}>Add New Item</Button>
      <Box border={'2px solid blue'}>
        <Box width={'800px'} height= {'100px'} bgcolor="#ADD8E6" display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography variant="h2" color="#333" fontFamily={'Cursive'}>Pantry Items</Typography>
        </Box>
    
        <Stack width={'800px'} height={'500px'} spacing={2} overflow="auto">
          {pantry.map(({name, quantity}) => (
                <Box key={name} width={'100%'} minHeight="150px" display={'flex'}
                     alignItems="center"
                     justifyContent={'space-between'}
                     bgcolor="#f0f0f0"
                     padding={6}>
                      <Typography variant="h3" color='#333' textAlign={'center'}>{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
                      <Stack direction={'row'} spacing={4}>
                      <Button variant="contained" sx={{borderRadius: '50%', bgcolor: 'green', fontSize:'25px'}} onClick={()=>{
                        addItem(name)
                      }}>+</Button>                         
                      <Typography variant="h3" color='#333' textAlign={'center'}>{quantity}</Typography>
                      <Button variant="contained" sx={{borderRadius: '50%', bgcolor: 'red', fontSize:'25px'}}  onClick={()=> {
                        removeItem(name)
                      }}>-</Button>
                      </Stack>
                </Box>
             ))}
        </Stack>
        </Box>
    </Box>
  
  );
}
