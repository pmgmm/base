.. index:: Text Area

.. _textarea:

Text Area
=========

Este componente recebe de dados em formato de texto (multilinha).

.. image:: ../resources/textarea.png

Requisitos
----------
       
===================================== ===============
``/framework/components/textarea.js``                       
``/framework/components/shared.js``   :ref:`jsshared`     
===================================== ===============

.. note:: As páginas geradas por :ref:`phppagehelper` fazem, por defeito, o carregamento dos componentes necessários.

----

Html do componente (tag)
------------------------

.. code:: html

    <fwk-textarea>
        <span slot="information">texto</span>
    </fwk-textarea>

==================== ================================= =========== ================================ =======
Atributo             Descrição                         Obrigatório Opções                           Default
==================== ================================= =========== ================================ =======
``id``               Identificador único do componente Sim (?)
``placeholder``      Placeholer do componente          Não             
``value``            Valor inicial                     Não         
``maxlength``        Tamanho máximo do texto           Não         "1", "2", ...                    content
``resize``           Redimensionamento                 Não         "vertical", "horizontal", "both"  
``rows``             Linhas visíveis                   Não         "1", "2", ...                    "3"
``mandatory``        Conteúdo obrigatório              Não         "true", "false"                  "false"
``disable``          Inibe componente                  Não         "true", "false"                  "false" 
``hide``             Esconde componente                Não         "true", "false"                  "false"     
``min-width``        Largura mínima componente         Não         "1", "2", ...                    "250"
``color``            Cor base do componente            Não         "blue", "gray"                   "gray"
``tooltip-position`` Posição do tooltip                Não         "left", "right"                  "right" 
==================== ================================= =========== ================================ =======

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

    const obj_textarea = FormHelper.getComponent('fwk_textarea');

Atribuir valor
^^^^^^^^^^^^^^
.. code:: Javascript

    obj_textarea.value = '?';

Ler valor
^^^^^^^^^
.. code:: Javascript

    let value = obj_textarea.value;

Atribuir foco
^^^^^^^^^^^^^
.. code:: Javascript

    obj_textarea.focus();

Atribuir / cancelar obrigatoriedade
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. code:: Javascript

   obj_textarea.mandatory = true;
   obj_textarea.mandatory = false;

Mostrar / esconder
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_textarea.hide = false;
    obj_textarea.hide = true;

Habilitar / inibir
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_textarea.disable = false;
    obj_textarea.disable = true;

Atribuir erro
^^^^^^^^^^^^^
.. code:: Javascript

   obj_textarea.error = true; (apenas sinalizador)
   obj_textarea.error = '???? \n ???';

Cancelar erro
^^^^^^^^^^^^^
.. code:: Javascript

    obj_textarea.error = false;

Ler estados
^^^^^^^^^^^
.. code:: Javascript

    let is_hide = obj_textarea.hide;
    let is_disable = obj_textarea.disable;
    let is_mandatory = obj_textarea.mandatory;
    let has_error = obj_textarea.error;

----

Referências
-----------

:ref:`jsformhelper` é uma classe de auxílio às operações sobre formulários.