module TimetablesHelper
    def iso_image(id)
        return image_tag 'hima.png', :width => '100%', :height => '100%', :id => id
    end

    def go_home_button
        return button_to "最初に戻る", {controller: 'timetables', action: 'index'}, {method: :get, params:{num1:'fromTM'},class: 'button full'}
    end

    def view_history
        return button_to "提出一覧を見る", {controller: 'timetables', action: 'history'}, {method: :get, params:{num1:'fromTM'},class: 'button full'}
    end

    def view_result
        return button_to "候補を見る", {controller: 'timetables', action: 'result'}, {method: :get, params:{num1:'fromTM'},class: 'button full'}
    end

    def view_history_back
        return button_to "前の画面へ戻る", {controller: 'timetables', action: 'history'}, {method: :get, params:{num1:'fromTM'},class: 'button full'}
    end

    def view_distribution
        return button_to "分布を見る", {controller: 'timetables', action: 'distribution'}, {method: :get, params:{num1:'fromTM'},class: 'button full'}
    end

    def go_setting
        return button_to "グループを編集", {controller: 'timetables', action: 'setting'}, {method: :get, params:{num1:'fromTM'},class: 'button full'}
    end
end
