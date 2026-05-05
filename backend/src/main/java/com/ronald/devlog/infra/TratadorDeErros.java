package com.ronald.devlog.infra;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class TratadorDeErros {

    //Tratar Erro de Validação (400 - Bad Request)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<DadosErroValidacao>> tratarErro400(MethodArgumentNotValidException ex) {
        List<FieldError> erros = ex.getFieldErrors();
        List<DadosErroValidacao> errosFormatados = erros.stream()
                .map(DadosErroValidacao::new)
                .toList();
        return ResponseEntity.badRequest().body(errosFormatados);
    }

    //Tratar Erro de Regra de Negócio (Erro 404 - Not Found)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> tratarErroRegraDeNegocio(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: " + ex.getMessage());
    }

    // RECORD para substituir classes inteiras
    private record DadosErroValidacao(String campo, String mensagem) {
        public DadosErroValidacao(FieldError error) {
            this(error.getField(), error.getDefaultMessage());
        }
    }
}
