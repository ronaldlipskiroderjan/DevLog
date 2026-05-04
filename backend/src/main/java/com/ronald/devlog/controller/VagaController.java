package com.ronald.devlog.controller;

import com.ronald.devlog.model.Vaga;
import com.ronald.devlog.repository.VagaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/vagas")
public class VagaController {

    private final VagaRepository repository;

    public VagaController(VagaRepository vagaRepository) {
        this.repository = vagaRepository;
    }

    @PostMapping
    public Vaga adicionarVaga(@RequestBody Vaga novaVaga){
        return repository.save(novaVaga);
    }

    @GetMapping
    public List<Vaga> listarTodas(){
        return repository.findAll();
    }

    @PutMapping("/{id}")
    public Vaga atualizarVaga(@PathVariable Long id, @RequestBody Vaga vagaAtualizada){
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
    @DeleteMapping("/{id}")
    public void deletarVaga(@PathVariable Long id){
        repository.deleteById(id);
    }
}
