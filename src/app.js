import React, { useEffect, useState } from 'react'
import { Heading, Text, useToast, Button, Image } from '@chakra-ui/core'
import { FaDog } from 'react-icons/fa'
import * as ml5 from 'ml5'

const ImageClassifier = () => {
  const [modelMessage, setModelMessage] = useState(null)
  const [startRec, setStartRec] = useState(false)
  const toast = useToast()
  const model = 'MobileNet'
  var classifierObject = null

  const classify = () => {
    classifierObject = ml5.imageClassifier(model, callBackModelLoaded)
  }

  const callBackModelLoaded = () => {
    let alert = {
      title: 'Carregamento do modelo',
      body: `Modelo ${model} foi carregado com sucesso :D`
    }

    setModelMessage(alert)
  }

  useEffect(() => {
    classify()
  }, [])

  useEffect(() => {
    if (modelMessage) {
      const { title, body } = modelMessage
      let toastConfig = {
        title,
        description: body,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      toast(toastConfig)
    }
  }, [modelMessage, toast])

  const initRecognition = () => {
    // Put the image to classify inside a variable
    // const image = document.getElementById('image');
    // Make a prediction with a selected image
    // classifier.predict(image, 5, function (err, results) {
      // print the result in the console
      // console.log(results);
    // })
    if (startRec) {
      return <Image src="../assets/images/Pug-Puppy-Dog.jpg" />
    } else
      return null
  }

  return (
    <React.Fragment>
      <Button m={10} size="lg" textAlign="center" isLoading={!modelMessage} loadingText="Carregando modelo" variantColor="teal" variant="solid" rightIcon={FaDog} onClick={() => setStartRec(true)}>
        <span>Reconhecer Raça</span>
      </Button>
    </React.Fragment>
  )
}

const App = () => {
  return (
    <div>
      <Heading size="lg" fontWeight="medium" fontSize="50px" textAlign="center">
        App Component
        <span role="img" aria-label="dog emoji">🐶</span>
      </Heading>
      <Text textAlign="center" fontWeight="light" fontSize="xl" justifyContent="center" mt={2} ml="12em" mr="12em">
        Exemplo de uma rede neural, utilizando a tecnologia da biblioteca <strong>ml5.js</strong> e <strong>MobileNet</strong> para o reconhecimento e classificação de imagens para raças de cães.
        <ImageClassifier />
      </Text>
    </div>
  )
}

export default App