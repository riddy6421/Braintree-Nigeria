package matimatiks.matimatiks;

import android.content.Intent;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ProgressBar;
import android.widget.TextView;

import java.io.IOException;

/**
 * Created by ridwan on 9/18/2016.
 */
public class Exam_mode extends AppCompatActivity implements SurfaceHolder.Callback {
    private Intent selected;
    private int sel;
    private String Exam, w_exam,c_exam,j_exam;
    private Button mode, mode2, mode3;
    private TextView textView;
    private ImageButton sign_out;
    public Boolean out = false;
    private MediaPlayer mp;
    private ProgressBar progressBar;
    private SurfaceView mSurfaceView;


    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exam_mode);

        /* Adding the status bar for the activity**/
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(getResources().getColor(R.color.company_color));
        }

        mp = new MediaPlayer();
        mSurfaceView = findViewById(R.id.surface);
        mSurfaceView.getHolder().addCallback(this);


        selected = getIntent();
        sel = selected.getIntExtra("SEL", -1);
        Exam = selected.getStringExtra("EXAM");
        w_exam = selected.getStringExtra("W");
        c_exam = selected.getStringExtra("C");
        j_exam = selected.getStringExtra("J");
      //  String tmp = "For ";

        textView = findViewById(R.id.mode_j);
        mode = findViewById(R.id.mode_butt1);
        mode2 = findViewById(R.id.mode_butt2);
        mode3 = findViewById(R.id.mode_butt3);
        progressBar = findViewById(R.id.pBar);
        sign_out = findViewById(R.id.out_button);


        progressBar.setVisibility(View.INVISIBLE);

      /* if(Exam != null)
        textView.setText(tmp.concat(Exam));

        else if (w_exam != null)
            textView.setText(tmp.concat(w_exam));

        else if (c_exam != null)
            textView.setText(tmp.concat(c_exam));

        else if (j_exam != null)
            textView.setText(tmp.concat(j_exam));*/

        mode.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                progressBar.setVisibility(View.VISIBLE);
                Intent intent = new Intent(Exam_mode.this, Profile.class);
                intent.putExtra("MODE", 0);
                intent.putExtra("SEL", sel);
                startActivity(intent);
            }
        });

        mode2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                progressBar.setVisibility(View.VISIBLE);
                Intent intent = new Intent(Exam_mode.this, Profile.class);
                intent.putExtra("MODE", 1);
                intent.putExtra("SEL", sel);
                startActivity(intent);
            }
        });

        mode3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                progressBar.setVisibility(View.VISIBLE);
                Intent intent = new Intent(Exam_mode.this, Profile.class);
                intent.putExtra("MODE", 2);
                intent.putExtra("SEL", sel);
                startActivity(intent);
            }
        });

        sign_out.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                out = true;
                Intent intent = new Intent(Exam_mode.this, Logout.class);
                startActivity(intent);
                Intent i = new Intent(Exam_mode.this, Splashscreen.class);
                i.putExtra("OUT", out);
            }
        });
    }


    @Override
    protected void onResume() {
            super.onResume();
        mp = new MediaPlayer();
        mSurfaceView = findViewById(R.id.surface);
        mSurfaceView.getHolder().addCallback(this);
        progressBar.setVisibility(View.INVISIBLE);
}

    @Override
    public void surfaceCreated(SurfaceHolder holder) {

        Uri video = Uri.parse("android.resource://" + getPackageName() + "/"
                + R.raw.pencil_down);

        try {
            mp.setDataSource(getApplicationContext(),video);
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            mp.prepare();
        } catch (IOException e) {
            e.printStackTrace();
        }

        //Start video
        mp.setDisplay(holder);
        mp.setLooping(true);
        mp.start();
    }

    @Override
    public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {

    }

    @Override
    public void surfaceDestroyed(SurfaceHolder holder) {

    }

    @Override
    public void onBackPressed() {
        Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_HOME);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
    }
}
