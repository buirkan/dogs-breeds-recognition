import React, { useEffect, useState } from "react"
import { useToast, Button, Image, List, ListItem, ListIcon } from "@chakra-ui/core"
import { FaDog, FaCheckCircle, FaTemperatureHigh } from "react-icons/fa"
import * as ml5 from "ml5"

const ImageClassifier = () => {
  const [modelMessage, setModelMessage] = useState(null)
  const [startRec, setStartRec] = useState(false)
  const [predicts, setPredicts] = useState([])
  const [file, setFile] = useState("")

  const toast = useToast()
  const model = "MobileNet"

  useEffect(() => {
    if (modelMessage) {
      const { title, body } = modelMessage

      let toastConfig = {
        title,
        description: body,
        status: "success",
        duration: 5000,
        isClosable: true
      }
      toast(toastConfig)
    }
  }, [modelMessage, toast])

  useEffect(() => {
    if (file)
      classifyFile()
  }, [file])

  const ImageController = () => {
    const handleSetFile = (event) => {
      let fileURL = URL.createObjectURL(event.target.files[0])
      setFile(fileURL)
    }

    return (
      <React.Fragment>
        <input type="file" onChange={handleSetFile} />
        <Image
          m={5}
          src={file}
          id="dogImage"
          width="-webkit-fill-available"
          height="420"
          objectFit="contain"
          border="none" />

        <List textAlign="initial" m={10} pl={4}>
          {predicts.map(p => (
            <ListItem key={p.label} m={3}>
              <span>
                <ListIcon icon={FaCheckCircle} color="green.500" />
                <strong>Categoria: </strong>{p.label}
              </span>
              <span style={{ display: "block" }}>
                <ListIcon icon={FaTemperatureHigh} color="green.500" />
                <strong>Probabilidade: </strong>{(p.confidence * 100).toFixed()}%
              </span>
            </ListItem>
          ))}
        </List>
      </React.Fragment>
    )
  }

  const classifyFile = () => {
    const classf = ml5.imageClassifier(model, () => {
      let alert = {
        title: "Carregamento do modelo",
        body: `Modelo ${model} foi carregado com sucesso :D`
      }

      setModelMessage(alert)
    })
    const el = document.getElementById("dogImage")

    classf.predict(el, 5, (err, predicts) => {
      if (err)
        console.error(err)
      else
        setPredicts(predicts)
    })
  }

  return (
    <div style={{textAlign: "center"}}>
      <Button m={10} size="lg" textAlign="center" variantColor="teal" variant="solid" rightIcon={FaDog} onClick={() => setStartRec(true)}>
        <span>Reconhecer Raça</span>
      </Button>
      <div style={{ visibility: (!startRec) ? "hidden" : "visible" }}>
        <ImageController />
      </div>
    </div>
  )
}

export default ImageClassifier