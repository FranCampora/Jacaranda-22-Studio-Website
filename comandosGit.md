 ### Actualizar el main
`git checkout main` -> Moverme a la rama main  
`git pull origin main` -> Actualiza la rama desde el repo  

### Creacion de ramas
`git checkout -b <branch>` -> Crear una nueva rama y moverme  
`git pull origin main` -> Actualiza la nueva rama con los datos de la origin  

### Agregar y commitear cambios
`git add .` -> Agrega todos los cambios o ruta específica  
`git status` -> Muestra el estado de los archivos (cambios, sin agregar, etc)  
`git reset HEAD path` -> deselecciona el archivo especificado (agrega todos excepto ...)   
`git commit -m "Mensaje del commit"` -> commitea lo agregado con el mensaje  

### Subir los commits al repo
`git push origin <branch>` -> Sube los cambios de la rama al repo  


## Merge rama main
`git checkout main` -> me muevo a la main  
`git pull origin main` -> actualizo la rama (No hace falta)  
`git merge <branch>` -> combina la rama con el main  
`git push origin main` -> Subo los cambios al repo

### Eliminar rama
`git branch -d <branch>` -> Eliminala rama local
