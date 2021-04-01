.. index:: Upload

.. _upload:

Upload
======

Este componente faz upload de ficheiros por arrastou ou selecção.

.. image:: ../resources/upload.png

Requisitos
----------
         
=================================== ===============
``/framework/components/upload.js``
``/framework/components/shared.js`` :ref:`jsshared`     
=================================== ===============

.. note:: As páginas geradas por :ref:`phppagehelper` fazem, por defeito, o carregamento dos componentes necessários.  

----

Html do componente (tag)
------------------------

.. code:: html

    <fwk-upload>
        <span slot="information">texto</span>
    </fwk-upload>

==================== =================================== =========== ================= =======
Atributo             Descrição                           Obrigatório Opções            Default
==================== =================================== =========== ================= =======
``id``               Identificador único do componente   Sim (?)    
``placeholder``      Placeholer do componente            Não      
``formats``          Formatos admitidos                  Não         '[".jpg", ...]'   [] 
``max-size``         Tamanho máximo (bytes) por ficheiro Não         "1", "2", ...     content
``multifiles``       Vários ficheiros                    Não         "true", "false"   "false"
``mandatory``        Ficheiro obrigatório                Não         "true", "false"   "false"
``disable``          Inibe componente                    Não         "true", "false"   "false" 
``hide``             Esconde componente                  Não         "true", "false"   "false"     
``width``            Largura do componente               Não         "1", "2", ...     "250"
``color``            Cor base do componente              Não         "blue", "gray"    "gray"
``tooltip-position`` Posição do tooltip                  Não         "left", "right"   "right" 
==================== =================================== =========== ================= =======

.. important:: O atributo ``id`` só é obrigatório no caso de ser necessária a identificação do componente para interacção com qualquer uma das suas funcionalidades.

==================== ======================= =========== ===========
Slot                 Descrição               Obrigatório Observações
==================== ======================= =========== ===========
``information``      Tooltip de informação   Não         Admite html
==================== ======================= =========== ===========

----

Funcionalidades
---------------

Assumindo que exite um objecto instanciado com o componente:

.. code:: Javascript

    const obj_upload = FormHelper.getComponent('fwk_upload');

Valor
^^^^^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    let value = obj_upload.value; (array(objfile, ...))

Mostrar / esconder
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_upload.hide = false;
    obj_upload.hide = true;

Habilitar / inibir
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_upload.disable = false;
    obj_upload.disable = true;

Atribuir erro
^^^^^^^^^^^^^
.. code:: Javascript

   obj_upload.error = true; (apenas sinalizador)
   obj_upload.error = '???? \n ???';

Cancelar erro
^^^^^^^^^^^^^
.. code:: Javascript

    obj_upload.error = false;

Ler estados
^^^^^^^^^^^
.. code:: Javascript

    let is_hide = obj_upload.hide;
    let is_disable = obj_upload.disable;
    let is_mandatory = obj_upload.mandatory;
    let has_error = obj_upload.error;

----

Referências
-----------

:ref:`jsformhelper` é uma classe de auxílio às operações sobre formulários.