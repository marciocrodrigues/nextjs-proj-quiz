import { useEffect, useState } from "react";
import QuestaoModel from "../model/questao";
import RespostaModel from "../model/resposta";
import Questionario from "../components/Questionario";

const questaoMock = new QuestaoModel(1, "Melhor cor?", [
  RespostaModel.errada("Verde"),
  RespostaModel.errada("Vermelha"),
  RespostaModel.errada("Azul"),
  RespostaModel.certa("Preta"),
]);

const BASE_URL = "http://localhost:3000/api";

export default function Home() {
  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([]);
  const [questao, setQuestao] = useState<QuestaoModel>(questaoMock);

  useEffect(() => {
    carregarIdsDasQuestoes();
  }, []);

  async function carregarIdsDasQuestoes() {
    const resp = await fetch(`${BASE_URL}/questionario`);
    const idsDasQuestoes = await resp.json();
    setIdsDasQuestoes(idsDasQuestoes);
  }

  async function carregarQuestao(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`);
    const json = await resp.json();
    const novaQuestao = QuestaoModel.criarUsandoObjeto(json);
    setQuestao(novaQuestao);
  }

  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0]);
  }, [idsDasQuestoes]);

  function questaoRespondida(questao: QuestaoModel) {}

  function irParaProximoPasso() {}

  return (
    <Questionario
      questao={questao}
      ultima={false}
      questaoRespondida={questaoRespondida}
      irParaProximoPasso={irParaProximoPasso}
    />
  );
}
