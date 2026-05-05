package com.ronald.devlog.service;

import com.ronald.devlog.model.Vaga;
import com.ronald.devlog.repository.VagaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VagaService {

    private final VagaRepository repository;

    public VagaService(VagaRepository repository) {
        this.repository = repository;
    }

    //Regra para: CRIAR VAGA
    public Vaga adicionarVaga(Vaga novaVaga) {
        if (novaVaga.getStatus() == null || novaVaga.getStatus().isEmpty()) {
            novaVaga.setStatus("Enviado");
        }
        return repository.save(novaVaga);
    }

    //Regra Para: LER
    public List<Vaga> listarTodas() {
        return repository.findAll();
    }

    // Regra Para: ATUALIZAR
    public Vaga atualizarVaga(Long id, Vaga vagaAtualizada) {
        return repository.findById(id)
                .map(vagaExistente -> {
                    vagaExistente.setTitulo(vagaAtualizada.getTitulo());
                    vagaExistente.setEmpresa(vagaAtualizada.getEmpresa());
                    vagaExistente.setStatus(vagaAtualizada.getStatus());
                    vagaExistente.setStack(vagaAtualizada.getStack());

                    return repository.save(vagaExistente);
                })
                .orElseThrow(() -> new RuntimeException("Vaga não encontrada com o ID: " + id));
    }

    // Regra Para: DELETAR
    public void deletarVaga(Long id){
        repository.deleteById(id);
    }
}
