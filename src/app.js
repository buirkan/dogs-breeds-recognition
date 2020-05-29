import React, { useEffect, useState } from 'react'
import { Heading, Text, useToast, Button, Image } from '@chakra-ui/core'
import { FaDog } from 'react-icons/fa'
import * as ml5 from 'ml5'

const ImageClassifier = () => {
  const [modelMessage, setModelMessage] = useState(null)
  const [startRec, setStartRec] = useState(false)
  const [classifier, setClassifier] = useState(undefined)
  const [file, setFile] = useState('')

  const toast = useToast()

  const model = 'MobileNet'

  const classify = () => {
    setClassifier(ml5.imageClassifier(model, callBackModelLoaded))
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

  useEffect(() => {
    if (file)
      classifyFile()
  })

  const ImageController = () => {
    const handleSetFile = (event) => {
      let fileURL = URL.createObjectURL(event.target.files[0])
      setFile(fileURL)
    }

    return (
      <React.Fragment>
        <input type="file" onChange={handleSetFile} />
        <Image
          src={file}
          id="dogImage"
          width="1020"
          height="420"
          objectFit="cover"
          border="none" />
      </React.Fragment>
    )
  }

  const classifyFile = () => {
    const classf = ml5.imageClassifier('MobileNet', () => {})
    const el = document.getElementById('dogImage')

    classf.predict(el, 5, (err, predicts) => {
      if (err)
        console.error(err)
      else
        console.log(predicts)
    })
  }

  return (
    <div>
      <Button m={10} size="lg" textAlign="center" isLoading={!modelMessage} loadingText="Carregando modelo" variantColor="teal" variant="solid" rightIcon={FaDog} onClick={() => setStartRec(true)}>
        <span>Reconhecer Raça</span>
      </Button>
      <div style={{ visibility: (!startRec) ? 'hidden' : 'visible' }}>
        <ImageController />
      </div>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <Heading size="lg" fontWeight="medium" fontSize="50px" textAlign="center">
        Reconhecimento da Raça
        <span ml={2} role="img" aria-label="dog emoji">🐶</span>
      </Heading>
      <Text textAlign="center" fontWeight="light" fontSize="xl" justifyContent="center" mt={2} ml="12em" mr="12em">
        Exemplo de uma rede neural, utilizando a tecnologia da biblioteca <strong>ml5.js</strong> e <strong>MobileNet</strong> para o reconhecimento e classificação de imagens para raças de cães.
        <ImageClassifier />
      </Text>
    </div>
  )
}

export default App