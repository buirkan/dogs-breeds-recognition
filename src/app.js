import React from "react"
import { Heading, Text} from "@chakra-ui/core"
import ImageClassifier from "./ImageClassifier"

const App = () => {
  return (
    <div>
      <Heading mt={5} size="lg" fontWeight="medium" fontSize="50px" textAlign="center">
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